//Validate return true of false if author is valid or not for this command
const validate = require(`${__dirname}/validate.js`)

module.exports = async function ( message, settings ) {

    if( !validate(message, settings) ) 
        return message.reply("sorry this is a master command")
        
    //Get the config from the process
    const config = await new Promise(end => process.emit('get_config', end))
    
    //Load settings from specified sqlite3
    settings = await config.load('data/settings.sqlite3')

    //Notify user
    return message.channel.send('Settings have been reloaded')

}
