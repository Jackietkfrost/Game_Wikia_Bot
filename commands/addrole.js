const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let rMember = message.mentions.members.first();
    let role = args.slice(1).join(" ");
    if(!role) return message.reply("Specify a role!");
    let gRole = message.guild.roles.find(c=> c.name === role);
    if(!gRole) return message.reply("Couldn't find that role.");
	await(rMember.addRole(gRole.id));
	try{
		await message.channel.send(`${gRole.name} Role Given to ${rMember}! `)
    }catch(e){}
}

module.exports.help = {
	name: "addrole",
	category: "Moderation"
}