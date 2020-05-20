module.exports = function ( settings, clients ) {
    
    //Require the MQTT core module
    const mqtt = require('mqtt');

    //Build credentials if there are any    
    const credentials = {}
    if( settings.mqttusername ) credentials.username = settings.mqttusername
    if( settings.mqttpassword ) credentials.password = settings.mqttpassword
    
    //Instansiate a new MQTT client
    const client = mqtt.connect(settings.mqttip, credentials); 

    //Attach MQTT client to client manager
    clients.mqtt = client
    
    return
    
}
