module.exports = function ( message, settings ) {
    return message.author.id == settings.master
}
