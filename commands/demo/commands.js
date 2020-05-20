module.exports = async function ( message, settings ) {

    //Example helper : COMMANDS
    //=========================
    
    //Get all the commands from process
    //Commands will be an object keyed by command names with their value
    //pointing to thier respective index.js files
    const commands = await new Promise(end => process.emit('get_commands', end))

    
    //Example : list all available commands 
    await message.channel.send(`Available commands: ${Object.keys(commands).join(", ")}`)

    //Example : trigger a specific command (help)
    await message.channel.send(`Triggering "help" command...`)
    await commands.help( message, settings )
     
    return
    
} 
