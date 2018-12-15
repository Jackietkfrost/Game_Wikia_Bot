
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

let score = bot.getScore.get(message.author.id, message.guild.id);
let user = message.author;
const pointsembed = new Discord.RichEmbed()
    .setAuthor(user.username, user.displayAvatarURL)
    .setThumbnail(message.author.displayAvatarURL)
    .addField("Level", score.level, true)
    .addField("XP", score.points, true)
    .setColor(0x33CCFF)

return message.reply(pointsembed)
//return message.reply(`You currently have ${score.points} and are level ${score.level}`)
}


module.exports.help = {
    name:"level",
    category:"Utilities"
}