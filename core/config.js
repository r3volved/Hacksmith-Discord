//Default settings
var settings = {    
    //Record to match for settings
    TABLE_ID : '1',
    
    //Bot token
    token : '',
    
    //Bot Command Prefix @@
    prefix : '',
    
    //Main Owner of bot (does not get affected by cooldowns ETC)
    master : '',
    
    //Main server the bot interacts with
    mainserverid : '',
    
    //where to place log events
    mainlogchannel : '',

    //Announcements and such > like player join
    announcementchannel : '',

    //Role that allows other users to do commands
    member_role : '',

    //ID of the bot - Depends on the token used
    botself_id : '',
    
    //Webhook URL to post Webhook messages
    webhookmqttpost : '',

    //IP of your MQTT server
    mqttip : '',

    //Extra Settings to load - Embeds mostly
    //set the server name
    servername : '',
    //set a url for logo image 200x200 (or close)
    logourl : '', 
    // EMBED TEXT 1
    text1 : '',
    // EMBED TEXT 2
    text2 : '',
    // EMBED TEXT 2
    text3 : '',
}

module.exports = {
    
    load : async function ( file ) {
        
        //initialize connection to sqlite3 DB
        const sqlite3 = require('sqlite3');
        const settings_database = new sqlite3.Database(file); 

        //Build sql query
        const sql = `SELECT * FROM settings WHERE TABLE_ID = ${settings.TABLE_ID};`

        //TODO...
        
        //Execute the query
        console.log(`SQL Executing`,sql)

        //Map the settings
        
        //Return the settings
        return settings

    },
    
    save : async function ( file, new_settings ) {
        
        if( !new_settings.TABLE_ID ) 
            throw new Error(`config.save requires a TABLE_ID defined in new_settings`)
    
        //initialize connection to sqlite3 DB
        const sqlite3 = require('sqlite3');
        const settings_database = new sqlite3.Database(file); 
        
        //Build sql query
        const fields = Object.keys(new_settings)
        const values = fields.reduce((accumulator, field) => {
            accumulator.push(`${field}=${JSON.stringify(fields[field])}`)
            return accumulator            
        },[])
        const sql = `INSERT INTO settings (${fields.join(",")}) WHERE TABLE_ID = ${new_settings.TABLE_ID} UPDATE ${values.join(",")};`

        //TODO...
        
        //Execute the query
        console.log(`SQL Executing`,sql)
                
        //Return the old settings merged with new settings
        return Object.assign(settings, new_settings)
    
    }
    
}
