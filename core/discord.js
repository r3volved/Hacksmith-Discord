//Return the current time as localeString
function event_time () {
    let eventtime = new Date();
	return eventtime.toLocaleString();
}

module.exports = function ( settings, commands, clients ) {

    //Require the discord library and instansiate a new client
    const Discord = require("discord.js"); //Capital letter Exception
    const client = new Discord.Client();  //Capital letter Exception

    //Attach discord client to clients manager
    clients.discord = client

    //Defaults
    var presence = { 
        status: 'online',
        activity : {
            name: 'with J.A.V.A', 
            type: 'PLAYING'
        }
    }

    //=======================
    //Discord Event listeners
    //=======================
    
    //Emitted whenever the bot connects to Discord
    client.on("ready", () => {

	    //General Bot information into botlog
	    console.log(`Bot is online`, event_time())
	    console.log(`- Prefix is "${settings.prefix}"`)
	    console.log(`- ${client.users.cache.size} user(s)`)
	    console.log(`- ${client.guilds.cache.size} server(s)`)

	    //Sets bot activity and status
	    client.user.setPresence(presence); 
	    console.log(`Bot presence set to ${presence.status}`, presence.activity)
	    
	    //Add an exta line for console readability
	    console.log(``)
		
    });


    // Emitted whenever the client joins a guild
    client.on("guildCreate", ( guild ) => {
	    console.log(`New guild joined: ${guild.name} (id: ${guild.id})`)
	    console.log(`This guild has ${guild.memberCount} members!`);
    });

    
    // Emitted whenever a guild kicks the client or the guild is deleted/left
    client.on("guildDelete", ( guild ) => {
	    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    });


    // Emitted whenever a user joins a guild
    client.on('guildMemberAdd', async ( member ) => {


    });


    // Emitted whenever a member leaves a guild, or is kicked
    client.on('guildMemberRemove', ( member ) => {
	    console.log(member.user.tag + " is no longer in the server ```" + event_time() + "```"); 
    });

    // Emitted whenever a user gets banned
    client.on('guildBanAdd', ( guild, user ) => {
	    console.log(user.tag + " has been banned ```" + event_time() + "```");
    });

    // Emitted whenever a channel is created
    client.on("channelCreate", ( channel ) => {
	    if(channel.type == "dm") return;
	    console.log(channel.name + " Has been Created ```" + event_time() + "```");
    });

    // Emitted whenever a channel is deleted
    client.on("channelDelete", ( channel ) => {
	    if(channel.type == "dm") return;
	    console.log(channel.name + " Has been Deleted ```" + event_time() + "```");
    });


    //===============
    //Handle messages 
    //===============
    
    //Emitted whenever a message is created
    client.on("message", async ( message ) => {
        
        //If author is a bot, ignore
        if( message.author.bot ) return;

        //If channel is dm, ignore
        if( message.channel.type == "dm" ) return;

        //if no command prefix, ignore
	    if( !message.content.startsWith(settings.prefix) ) return; 

	    //What to do if @ everyone or @thebot is done
	    if( message.mentions.has(client.user) ) {
		    console.log("Bot was mentioned for some reason");
	    }
        
        //Get the first word without the prefix and make sure it's lowercase      
        const command_name = message
            .content
            .split(/\s+/)[0]
            .slice(settings.prefix.length)
            .toLowerCase()
            
        //If command doesn't exist, ignore
        if( !commands[command_name] ) return
	
        try {
            
    	    //Run the command - pass the message, bot settings and clients manager
            await commands[command_name]( message, settings )

        } catch(err) {
         
    	    //If message fails, return the error
            message.channel.send( err.message )   
            
            //Alternatively, log the error
            console.error( err )
            
        }

    });
    
    
    //Trigger initial login
    console.log('Connecting to discord');
	return client.login(settings.token);    

}

