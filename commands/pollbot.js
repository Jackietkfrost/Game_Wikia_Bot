const Discord = require("discord.js");

module.exports.help = {
    name:"poll",
    category:"Fun",
    description:"A debate settler!",
    usage:".poll <Question>"
}
    module.exports.run = async (bot, message, args) => {
        let question = args.join(" ");
        let user = message.author;
        let pollEmbed = new Discord.RichEmbed()
        .setTitle(`${question}`)
        .setColor(`RANDOM`)
        .setFooter(`poll started by ${user.username}`, `${user.displayAvatarURL}`)
        message.delete()
        message.channel.send(pollEmbed)
        .then(msg => {
            msg.react(`👍`).then(r => {
                msg.react(`🤷`).then(y => {
                    msg.react(`👎`)
                
            })
        })
    })
            console.log(question)
}