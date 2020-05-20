//Validate return true of false if author is valid or not for this command
const validate = require(`${__dirname}/validate.js`)

module.exports = async function ( message, settings ) {

    if( !validate(message, settings) ) 
        return message.reply("sorry this is a master command")
        
    return process.emit('SIGTERM')

}
