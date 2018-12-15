const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => 
{
    try{
        //let user = message.author;
        let user = message.mentions.users.first();

        if(user === undefined){
            user = message.author;
        }

        //console.log(user.id);
     //  console.log(user.channel.roles.map(role=>role.name).join(", "));


        let sicon = user.displayAvatarURL;
        let userembed = new Discord.RichEmbed()
        .setAuthor(`${user.username}'s info`, sicon)
        .setColor('RANDOM')
        .setThumbnail(sicon)
        //.addField("Roles: ", message.mentions.members.first().roles.map(r => r.name).join(', '))
        .addField("Roles: ",bot.guilds.get(message.guild.id).members.get(user.id).roles.map(role=>role.name).join(", "),true)// user, roles
        .addField("Status", user.presence.status,true)
        .addField("Created On", user.createdAt)
        
        return message.channel.send(userembed)
        
    } 
    catch(err)
    {
        console.log(err)
        //return message.channel.send(`Something's wrong. This shouldn't have happened. Please tell ${message.guild.owner}...`)
    }
}


module.exports.help = {
    name:"userinfo",
    category:"Utilities"
}