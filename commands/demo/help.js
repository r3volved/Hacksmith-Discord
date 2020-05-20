module.exports = async function ( message, settings ) {

    return message.channel.send({ 
        embed:{
            title:"Demo help",
            description:[
                "This would be command help",
                "Try `demo test`"
            ].join("\n")        
        }
    })

}
