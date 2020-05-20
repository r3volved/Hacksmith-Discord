//Validation script
//In this case, we are testing to make sure the author is master
module.exports = function ( message, settings ) {
    return message.author.id == settings.master
}
