module.exports = async function ( message, settings ) {

    await message.channel.send({ 
        embed:{
            title:"Demo help",
            description:[
                "This would be command help to list / describe subcommands and any usage:",
                `${settings.prefix}demo help`,
                `${settings.prefix}demo clients`,
                `${settings.prefix}demo commands`,
                `${settings.prefix}demo config`,
                `${settings.prefix}demo device`,
                `${settings.prefix}demo discord`,
                `${settings.prefix}demo socket`,
            ].join("\n")
        }
    })
    
    return

}
