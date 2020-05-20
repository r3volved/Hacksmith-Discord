//Get commands returns a promised-array of command names
const get_commands = require(`${__dirname}/get-commands.js`)

module.exports = async function ( message, settings ) {
    
    const names = await get_commands()
    
    //Map the commands with prefix and join them as multi-line        
    const help_list = names
        .map(key => `${settings.prefix}${key}`)
        .join("\n")

    //Send the help list back to channel in an embed
    await message.channel.send({ 
        embed:{
            title:'Help',
            description:help_list
        } 
    })
        
    return
                
} 
