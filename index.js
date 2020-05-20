//===================
//Initialize the core
//===================

//Include the core
const { config, discord, websocket, mqtt } = require(`${__dirname}/core`)

//Include the commands
const commands = require(`${__dirname}/commands`)

//Client connection manager (discord, database, etc)
const clients = {}

//Try to close any open clients
async function close () {

    //Iterate the client keys
    for( var key in clients ) {
            
        var client = clients[key]        

        //If client has a close command, trigger it
        if( typeof client.close == 'function' ) 
            await client.close().catch(console.error)

    }
    
    //Exit the process
    process.exit(0)

}


//=============
//Process hooks
//=============

//Hijack the sigint and sigterm to close gracefully
process.on('SIGINT', close);
process.on('SIGTERM', close);

//Perform a callack on config
process.on('get_config', function ( callback ) {
    callback( config )
});

//Perform a callack on commands
process.on('get_commands', function ( callback ) {
    callback( commands )
});

//Perform a callack on clients
process.on('get_clients', function ( callback ) {
    callback( clients )
});


//===================
// Load settings 
// Initialize clients
// Start discord
//===================

var test = null;

(async function () {
    
    //Load settings with specific sqlite3 database
    var settings = await config.load('data/settings.sqlite3')
    
    
    /** Attach whatever MQTT clients here ... **/
    //TEST MQTT WITH test.mosquitto.org
    clients.some_device = await new mqtt('mqtt://test.mosquitto.org').connect()
    test = await clients.some_device.publish('presence', 'Hello mqtt')
    console.log('MQTT test:',test)


    /** Attach whatever websocket clients here ... **/    
    //TEST WEBSOCKET WITH echo.websocket.org
    clients.some_socket = await new websocket('ws://echo.websocket.org/').connect()
    test = await clients.some_socket.send('WEBSOCKET ECHO TEST')
    console.log('Websocket test:',test)
    
        
    //Finally, connect to discord
    await discord( settings, commands, clients )
})();
