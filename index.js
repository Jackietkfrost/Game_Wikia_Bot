const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
const SQLite = require("better-sqlite3");
const scoresql = new SQLite('./scores.sqlite');
const infosql = new SQLite('Info.sqlite');
bot.commands = new Discord.Collection();
let commandPrefix = botconfig.commandPrefix;
fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
    });
    
    bot.on("ready", async () => {
    bot.user.setActivity(`${commandPrefix}help`,{type: 'WATCHING'})
    console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);

/*                                                     START SCORE SECTION                                                     */
    const scoretable = scoresql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
    if (!scoretable['count(*)']) {
        // If the table isn't there, create it and setup the database correctly.
        scoresql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);").run();
        // Ensure that the "id" row is always unique and indexed.
        scoresql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
        scoresql.pragma("synchronous = 1");
        scoresql.pragma("journal_mode = wal");
    }
    
    // And then we have two prepared statements to get and set the score data.
    bot.getScore = scoresql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
    bot.setScore = scoresql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (@id, @user, @guild, @points, @level);");
/**                                                     END SCORE SECTION                                                            */

/*                                                      START INFO SECTION                                                         */

const infoTable = infosql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'info';").get();
if (!infoTable['count(*)']) {
    // If the table isn't there, create it and setup the database correctly.
    infosql.prepare("CREATE TABLE info (id INTEGER PRIMARY KEY, command TEXT, information TEXT);").run();
    // Ensure that the "id" row is always unique and indexed.
    infosql.prepare("CREATE UNIQUE INDEX idx_info_id ON info (id);").run();
    infosql.pragma("synchronous = 1");
    infosql.pragma("journal_mode = wal");
}

// And then we have two prepared statements to get and set the score data.
//const getInfo = infosql.prepare("SELECT * FROM infos WHERE command = ? AND information = ?");
//bot.setInfo = infosql.prepare("INSERT INTO infos (command, information) VALUES (?, ?);");
});

/*                                                       END INFO SECTION                                                          */

function checkMessageForCommand(msg, isEdit) {
    //check if message is a command
    if(msg.author.id != bot.user.id && (msg.content.startsWith('.'))){
        console.log("\"treating " + msg.content +"\" from " + msg.author + " as command");
        var cmdTxt = msg.content.split(" ")[0].substring(botconfig.commandPrefix.length);
        var suffix = msg.content.substring(cmdTxt.length+botconfig.commandPrefix.length+1);//add one for the ! and one for the space
        if(msg.isMentioned(bot.user)){
            try {
                cmdTxt = msg.content.split(" ")[1];
                suffix = msg.content.substring(bot.user.mention().length+cmdTxt.length+botconfig.commandPrefix.length+1);
            } catch(e){ //no command
                //msg.channel.send("Yes?");
                return false;
            }
        }
    }
}
    

bot.on("guildMemberAdd", async member => {
    console.log(`${member.id} joined the server.`);

    let welcomechannel = member.guild.channels.find(c => c.name === "join_leave")
    welcomechannel.send(`${member} has joined.`);

});

bot.on("guildMemberRemove", async member => {
    console.log(`${member.id} left the server.`);

    let welcomechannel = member.guild.channels.find(c => c.name === "join_leave")
    welcomechannel.send(`${member} has left.`);
    
});


bot.on("message", async message => {
    if(!message.content.startsWith(commandPrefix)) return;
        if(!checkMessageForCommand(message, false)){
        if(message.author.bot) return;
        if(message.channel.type == "dm") return;
        let score;
        if (message.guild) {
        score = bot.getScore.get(message.author.id, message.guild.id);
        if (!score) 
        {
            score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1 }
        }
            score.points+= Math.floor(Math.random()* (20 - 10) + 10);
            const curLevel = Math.floor(0.1 * Math.sqrt(score.points));

            if(score.level < curLevel) {
            score.level++;
            if(score.level === 1){
                message.member.addRole(message.guild.roles.find(role=> role.name === 'Peasant'))
            }
            if(score.level === 5){
                message.member.addRole(message.guild.roles.find(role=> role.name === 'Citizen'))
            }
            if(score.level === 10){
                message.member.addRole(message.guild.roles.find(role=> role.name === 'Respectable'))
            }
            if(score.level === 15){
                message.member.addRole(message.guild.roles.find(role=> role.name === 'Illustrious'))
            }
            if(score.level === 20){
                message.member.addRole(message.guild.roles.find(role=> role.name === 'Noble'))
            }
            message.reply(`You've leveled up to level **${curLevel}**!`).then(msg => msg.delete(1500));
            }
        bot.setScore.run(score);
        }
        
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];
        let args = messageArray.slice(1);
        let commandfile = bot.commands.get(cmd.slice(commandPrefix.length));
        if(commandfile) commandfile.run(bot,message,args);




}
});

bot.login(botconfig.token);