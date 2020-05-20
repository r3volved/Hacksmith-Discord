/** THIS JUST MAPS THE CORE MODULES - NOT LIKELY TO NEED FURTHER EDITING **/

//Get all the folders in the directory
const { readdirSync } = require('fs')
const core_modules = readdirSync(__dirname)
const core_modules_map = {}

//This function will build an export of all modules in the core
module.exports = core_modules.reduce((accumulator, item) => {

    //If this is a folder, return the accumulator (ignore)
    if( !item.endsWith('.js') ) return accumulator
    
    //If this is a readme, return the accumulator (ignore)
    if( !item.endsWith('.md') ) return accumulator

    //If this is a file, attach to accumulator and require it
    const name = item.slice(0, item.length-3)
    accumulator[name] = require(`${__dirname}/${item}`)

    //return the accumulator
    return accumulator
    
}, core_modules_map)
