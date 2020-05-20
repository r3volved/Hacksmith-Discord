//Add a validate **only if validation required** 
const validate = require(`${__dirname}/validate.js`)

//Command execution
module.exports = async function ( message, settings ) {
    
    //Validate the author if necessary
    //If validation is necessary, should be done first
    if( !validate(message, settings) ) 
        return message.reply("sorry this is a master command")



    //Example helper : SUBCOMMAND
    //===========================
    //Trigger a subcommand from this command 
    //Note : You usually want to do this routing before anything else in command
    //First, get word at subcommand position
    const subcommand = message.content.split(/\s+/)[1] || ''
    switch( subcommand.toLowerCase() ) {
    
        //If we match it, map it and run it
        case "test" : 
            //Require the subcommand
            const test = require(`${__dirname}/test.js`)
            //Execute the subcommand
            return await test( message, settings )

        case "help" : 
            //Require the subcommand
            const help = require(`${__dirname}/help.js`)
            //Execute the subcommand
            return await help( message, settings )

        //If no match, ignore and continue
        default:
    }
    //===========================

        
    
    //Example helper : CONFIG
    //=======================
    //Get the config core from process
    const config = await new Promise(end => process.emit('get_config', end))    
    
    //Example : reload settings from a specific sqlite3 database
    settings = await config.load('data/settings.sqlite3')
    //Example : save settings to a specific sqlite3 database
    settings = await config.save('data/settings.sqlite3', settings)
    //=======================



    //Example helper : COMMANDS
    //=========================
    //Get all the commands from process
    //Commands will be an object keyed by command names with their value
    //pointing to thier respective index.js files
    const commands = await new Promise(end => process.emit('get_commands', end))

    //Example : trigger a specific command
    await commands.help( message, settings )
    //=========================
     
     
     
    //Example helper : CLIENTS
    //========================        
    //Get the clients manager from process
    //Clients will be an object keyed by client name with their value
    //pointing to their respective instansiated-client
    const clients = await new Promise(end => process.emit('get_clients', end))    
    
    //Example : send a message to specific channel on a specific server
    const discord = clients.discord
    const guild   = discord.guilds.cache.get("647131994701955095")
    if( !guild ) return message.reply("Cannot send message to a guild I am not a member of")
    const channel = guild.channels.cache.get("647277579656757258")
    if( !channel ) return message.reply("Cannot send message to a channel I can't see")
    
    channel.send("This message sent to specified channel in specified guild")
    //========================        
    

    message.channel.send(`Try also, ${settings.prefix}demo test`)
    
    
    //Always end async function with a 'return' somewhere (even if returning nothing)
    //This tells javascript that the promise has been completed
    //Note : Errors are set to bubble out to discord-message-handler try/catch
    return

}
