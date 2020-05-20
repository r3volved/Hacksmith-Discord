module.exports = async function ( message, settings ) {

    //Get the clients manager from process
    //Clients will be an object keyed by client name with their value
    //pointing to their respective instansiated-client
    const clients = await new Promise(end => process.emit('get_clients', end))    

    //Get a device from client manager
    const device = clients.some_device
    
    //Send a message to websocket
    const device_result = await device.send('presence', 'Hello device')

    //Send result back to user
    await message.channel.send(`Result of device test: ${device_result}`)
    
    return
} 
