const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
module.exports.run = async (bot, message, args) => {

    const top10 = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;").all(message.guild.id);
 
    // Now shake it and show it! (as a nice embed, too!)
  const embed = new Discord.RichEmbed()
    .setTitle("Top 10")
    .setAuthor("Leaderboard")
    .setThumbnail("https://vignette.wikia.nocookie.net/oberin/images/e/e6/Oberinlogo.png/revision/latest?cb=20051204050716")
    //.setDescription("Top 10")
    .setColor(0x00AE86);
 


  for(const data of top10) {
    //It had a .tag at the end, but it was considered undefined, so I removed it and was left with (data.user) instead of (data.user).tag. 
    //Would that have anything to do with it? I've researched on .tag and I've found nothing on sqlite or discord.js
    if(bot.users.get(data.user)!= null){
        nickname = bot.guilds.get(message.guild.id).members.get(data.user).displayName
        embed.addField(nickname, `${data.points} points (level ${data.level})`);
         // console.log(bot.users.get(data.user).avatarURL);
    }
  }
  return message.channel.send({embed});
}

module.exports.help = {
    name:"leaderboard",
    category:"Utilities"
    
}