module.exports = async function ( message, settings ) {

    //Example helper : CONFIG
    //=======================
    //Load/save settings against an existing sqlite3 database
    
    //Get the config core from process
    const config = await new Promise(end => process.emit('get_config', end))    
    

    //Example : (re)load settings from a specific sqlite3 database
    settings = await config.load('data/settings.sqlite3')
    
    await message.channel.send('Settings have been reloaded')


    //Example : save settings to a specific sqlite3 database
    settings = await config.save('data/settings.sqlite3', settings)
    
    await message.channel.send('Settings have been saved')

    return
    
} 
