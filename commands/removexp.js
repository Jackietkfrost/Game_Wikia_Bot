 const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let score = bot.getScore.get(message.author.id, message.guild.id);
    // Limited to guild owner - adjust to your own preference!
    if(!message.author.id === message.guild.owner) return message.reply("You're not the boss of me, you can't do that!");
    
    const user = message.mentions.users.first() || bot.users.get(args[0]);
    if(!user) return message.reply("You must mention someone or give their ID!");
    
    const pointsToRemove = parseInt(args[1], 10);
    if(!pointsToRemove) return message.reply("You didn't tell me how many points to take...")
    
    // Get their current points.
    let userscore = bot.getScore.get(user.id, message.guild.id);
    // It's possible to give points to a user we haven't seen, so we need to initiate defaults here too!
    if (!userscore) {
        userscore = { id: `${message.guild.id}-${user.id}`, user: user.id, guild: message.guild.id, points: 0, level: 1 }
    }
    userscore.points -= pointsToRemove;
    
    // We also want to update their level (but we won't notify them if it changes)
     let userLevel = Math.floor(0.1 * Math.sqrt(score.points));
    userscore.level = userLevel;
    
    // And we save it!
    bot.setScore.run(userscore);
    
    return message.channel.send(`${user.tag} has been deducted ${pointsToRemove} points and now stands at ${userscore.points} points.`);
}


module.exports.help = {
    name:"removexp",
    category:"DEV"
}