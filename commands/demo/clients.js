module.exports = async function ( message, settings ) {

    //Get the clients manager from process
    //Clients will be an object keyed by client name with their value
    //pointing to their respective instansiated-client
    const clients = await new Promise(end => process.emit('get_clients', end))    
    
    //List all the available clients
    await message.channel.send({
        embed:{
            title:`Currently connected clients`,
            description:Object.keys(clients).join("\n")
        }
    })
    
    return

} 
