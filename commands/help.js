const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let help = new Discord.RichEmbed()
        .setAuthor("List of Commands")
        .setColor(0x703817)
        //.addField("Admin", `${bot.commands.filter(cmd => cmd.help.category === 'Admin').map(cmd => `\`${cmd.help.name}\``).join(", ")}`, true)
        .addField("Moderation", `${bot.commands.filter(cmd => cmd.help.category === 'Moderation').map(cmd => `\`${cmd.help.name}\``).join(", ")}`, true)
        .addField("Fun and Misc", `${bot.commands.filter(cmd => cmd.help.category === 'Fun').map(cmd => `\`${cmd.help.name}\``).join(", ")}`, true)
        .addField("Utilities", `${bot.commands.filter(cmd => cmd.help.category === 'Utilities').map(cmd => `\`${cmd.help.name}\``).join(", ")}`, true);
    message.channel.send(help)
}


module.exports.help = {
    name:"help",
    category: "utilities",
    description: "Gives a list of all commands."
}