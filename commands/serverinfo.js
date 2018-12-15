const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let sicon = message.guild.iconURL;
    let Guild = message.guild.name;
    let serverembed = new Discord.RichEmbed()

    .setAuthor(`${Guild}'s Server Information`)
    .setColor("ff0000")
    .setThumbnail(sicon)
    .addField("Owner", message.guild.owner)
    .addField("Total Members", message.guild.memberCount, true)
    .addField("Available Roles:", message.guild.roles.map(role => role.name).join(", "),true)
    .addField("Created On", message.guild.createdAt);

    return message.channel.send(serverembed);

}

module.exports.help = {
    name:"serverinfo",
    category:"Utilities"
}