/** THIS JUST MAPS THE COMMANDS - NOT LIKELY TO NEED FURTHER EDITING **/

//Get all the folders in the directory
const { readdirSync } = require('fs')
const commands = readdirSync(__dirname)
const command_map = {}

//This function will build an export of all commands in the folder
module.exports = commands.reduce((accumulator, command) => {

    //If this is a file, return the accumulator (ignore)
    if( command.endsWith('.js') ) return accumulator

    //If this is a readme, return the accumulator (ignore)
    if( command.endsWith('.md') ) return accumulator

    //If this is a folder, attach to accumulator and require it
    accumulator[command] = require(`${__dirname}/${command}`)

    //return the accumulator
    return accumulator
    
}, command_map)
