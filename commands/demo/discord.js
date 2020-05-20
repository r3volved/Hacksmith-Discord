module.exports = async function ( message, settings ) {

    //Get the clients manager from process
    //Clients will be an object keyed by client name with their value
    //pointing to their respective instansiated-client
    const clients = await new Promise(end => process.emit('get_clients', end))    
    
    const discord = clients.discord

    //Send some discord client details
    await message.channel.send({
        embed:{
            title:`Currently connected clients`,
            description:[
                `Connected to Discord as ${discord.user.tag}`,
                `- Prefix is "${settings.prefix}"`,
                `- ${discord.users.cache.size} user(s)`,
                `- ${discord.guilds.cache.size} server(s)`
            ].join("\n")
        }
    })
    
    return

} 
