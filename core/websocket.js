/** THIS WILL LIKELY NEED ADJUSTING DEPENDING ON YOUR COMMUNICATION PROTOCOL **/
/** THIS WILL NOT BE SOMETHING YOU NEED TO MODIFY ONCE PREPARED **/

module.exports = class Websocket {
    constructor( url ) {
        this.url = url
        this.req_id = 0 
        this.queue = []
        this.client = null        
    }
    
    connect ( url, args = [], options = {} ) {
        return new Promise((resolve, reject) => {

            //Update url if not set with constructor
            this.url = url || this.url
            if( !this.url ) 
                return reject("Please specify a url to websocket contructor or connect")

            //Merge options
            options = Object.assign({
                WebSocket: require('ws'),
                maxReconnectionDelay: 120000,
                minReconnectionDelay: 1000 + Math.random() * 4000,
                reconnectionDelayGrowFactor: 2,
                connectionTimeout: 5000,
                maxRetries: 1,
            }, options)             

            //Require the reconnecting-websocket core module
            //THIS IS A THIRD PARTY LIBRARY
            const ReconnectingWebSocket = require('reconnecting-websocket');

            //Initialize a new websocket on the specified url            
            this.client = new ReconnectingWebSocket(this.url, args, options)
            
            //Log websocket errors to console
            this.client.addEventListener('error', console.error);

            //Resolve the connected promise when connected
            this.client.addEventListener('open', () => {
                console.log(`Websocket connected to:`, this.url)
                resolve(this)
            });

            //Initialise the websockett listener
            this.client.addEventListener('message', async (message) => {
                var data = {}
                try { 
                    //Try to get json data from message                    
                    data = JSON.parse(message.data) 
                } catch(e) {
                    //Otherwise return text
                    data = message.data 
                }

                //If the message has an ID, look for a queued callback
                if( data.id ) {
                    var index = -1
                    this.queue.forEach((item,i) => {
                        index = item.id === data.id ? i : index
                    })

                    //If id is queued, splice off queue
                    if( index >= 0 ) {
                        var item = this.queue.splice(index,1)[0]
                        //If item has a callback function, callback the data
                        if( typeof item.callback === 'function' ) item.callback(data.data)
                   }
                } else {
                    console.log('Unqueued websocket message',data)
                }
            });                         
        })
    
    }
    
    async send ( data ) {
        //If not connected, throw error
        if( !this.client ) 
            throw new Error('Websocket is not connected to any url right now')

        //Stringify if not already a string or buffer
        if( typeof data == 'object' && !data.isBuffer ) 
            data = JSON.stringify(data)
        
        //Send the message and queue the callback
        return new Promise(callback => {
            var this_id = ++this.req_id
            this.queue.push({ id:this_id, callback })
            this.client.send(JSON.stringify({ id:this_id, data }))
        })
    }    
    
    async close () {
        if( !this.client ) return
        console.log(`Closing websocket`)
        //Try remove all the event listeners
        try { this.client.removeEventListener('error') } catch(e) {}
        try { this.client.removeEventListener('open') } catch(e) {}
        try { this.client.removeEventListener('message') } catch(e) {}        
        //If socket has close function, trigger close
        if( this.client.close ) {
            try { this.client.close() } catch(e) {}
        }
        //Clear the socket
        return this.client = null   
    }

}

