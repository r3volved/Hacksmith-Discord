module.exports = async function ( message, settings ) {
    
    //Validate the author if necessary
    //Note: If any validation is necessary, should be done first
    const validate = require(`${__dirname}/validate.js`)
    if( !validate(message, settings) ) 
        return message.reply("sorry this is a master command")


    //Example : SUBCOMMANDS
    //===========================
    //Trigger a subcommand from this command 
    //Note : You usually want to do this routing before anything else in command
    //First, get word at subcommand position
    const subcommand = message.content.split(/\s+/)[1] || ''

    var matched = null
    switch( subcommand.toLowerCase() ) {
    
        //If we match it, map it and run it
        case "help" : 
        case "clients" : 
        case "commands" :
        case "config" :
        case "device" :
        case "discord" :
        case "socket" :
            //Require the subcommand
            matched = require(`${__dirname}/${subcommand.toLowerCase()}.js`)
            break

        //If no match, ignore and continue
        default:
    }

    //If subcommand was matched, route to subcommand
    if( matched && typeof matched == 'function' ) 
        return await matched( message, settings )
    //===========================

        

    //...do stuff here if not a subcommand    
    await message.channel.send(`For subcommands, try ${settings.prefix}demo help`)
     
     
    //Always end async function with a 'return' somewhere (even if returning nothing)
    //This tells javascript that the promise has been completed
    //Note : Errors are set to bubble out to discord-message-handler try/catch
    return

}
