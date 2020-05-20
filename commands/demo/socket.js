module.exports = async function ( message, settings ) {

    //Get the clients manager from process
    //Clients will be an object keyed by client name with their value
    //pointing to their respective instansiated-client
    const clients = await new Promise(end => process.emit('get_clients', end))    

    //Get a websocket from client manager
    const socket = clients.some_socket
    
    //Send a message to websocket
    const socket_result = await socket.send('SOME MESSAGE TEST')

    //Send result to user
    await message.channel.send(`Result of websocket test: ${socket_result}`)
    
    return
    
} 
