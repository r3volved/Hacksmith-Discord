//Get the commands from the process and return array of command names
module.exports = function get_commands () {
    return new Promise(end => {
        process.emit('get_commands', function ( commands ) {
            end( Object.keys(commands) )
        })
    })
}
