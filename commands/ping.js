const Discord = require("discord.js");

module.exports.help = {
    name:"ping",
    category:"Utilities",
    description:"Verification of server delay to bot.",
    usage:".ping"
}



module.exports.run = async (bot, message, args) => {
    message.reply(`Pong! ${(bot.ping)} ms`)

}
