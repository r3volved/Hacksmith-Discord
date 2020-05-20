/** THIS WILL LIKELY NEED ADJUSTING DEPENDING ON YOUR COMMUNICATION PROTOCOL **/
/** THIS WILL NOT BE SOMETHING YOU NEED TO MODIFY ONCE PREPARED **/

module.exports = class MQTT {
    constructor( url, credentials ) {
        this.url = url 
        this.credentials = credentials
        this.req_id = 0 
        this.queue = []
        this.client = null
    }

    async connect ( url, credentials ) {
        return new Promise((resolve, reject) => {
            this.url = url || this.url 
            if( !this.url ) 
                return reject("MQTT client requires a url specified in constructor or connect")
                
            this.credentials = credentials || this.credentials
            
            //Require the async-mqtt core module
            //THIS IS A THIRD PARTY LIBRARY
            const mqtt = require('async-mqtt');
            
            //Instansiate a new MQTT client
            this.client = mqtt.connect(this.url, this.credentials); 
            
            //Monitor the connection event
            this.client.on('connect', () => {
                console.log('MQTT Client connected to', this.url)
                resolve(this)
            })

            //Monitor the message event
            this.client.on('message', ( topic, message, packet ) => {
                console.log(topic, message)            
            
            })
        })   
    }
    
    async publish ( topic, message ) {
        return await this.client.publish( topic, message )
    }
    
    async send ( topic, message ) {
        return await this.publish( topic, message )
    } 
    
    async close () {
        if( !this.client ) return
        await this.client.end()
        return this.client = null
    }
}

