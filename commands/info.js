const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const db = new SQLite('./info.sqlite');
module.exports.run = async (bot, message, args) => {

    const insert =  db.prepare("INSERT INTO info (command, information) VALUES (?, ?);");
    const deleterow = db.prepare("DELETE FROM info WHERE (id) = (?)");
    const select =  db.prepare("SELECT * FROM info WHERE command = ? LIMIT 0,30");
    const list =  db.prepare("SELECT MIN(id) AS id, command FROM info GROUP BY command");

    const GM = message.member.roles.find(c=> c.name === "Game Master")
    let botchannel = message.guild.channels.find(c => c.name === 'bot-commands')
    function Rnd(max) 
    {
        return Math.floor(Math.random() * Math.floor(max));
    }
    time = 3000;
    var commandcut = message.content.substr(".info ".length);
    //var command = "";
    //console.log(commandcut);
    var action =data=com=info= '';

    //console.log('Split 1')
    action = commandcut.split(/:(.+)/)[0]
    //console.log('Split 2')
    data = commandcut.split(/:(.+)/)[1]
    if(data!= null){
    com = data.split(/,(.+)/)[0];
    //console.log('Split 4')
    info = data.split(/,(.+)/)[1];
    }
    //console.log('Action: '+action);
    //console.log('Command: '+ com);
    //console.log('Information: '+ info);

    if(action === 'add')
    {
        if(!GM)
        {
            message.delete();   
            botchannel.send(`${message.author} tried to use the info ADD command.`);
            return message.reply('Baseless rumors. Stop taking up my time.').then(msg => msg.delete(time));
        }
        if(GM && message.channel.name !== 'bot-commands')
        {
            message.delete();   
            return message.author.send("Please use this command in #bot-commands, sir!");
        }
        if(GM && botchannel)
        {
            const dberr = insert.run(com, info);
            //console.log(dberr.changes);
            message.channel.send('Added to the Database');
        }
    }
    else if(action === 'get')
    {
        if(!GM)
        {
            message.delete();
            botchannel.send(`${message.author} tried to use the info GET command.`);
            return message.reply('Who told you this? Spy! Only Game Masters may use this command!').then(msg => msg.delete(time));
        }
        //Command needs to be fixed, it is always giving true, when should be false messaging bot-commands.
        if(GM && message.channel.name !== 'bot-commands')
        {
            message.delete();
            return message.author.send("Please use this command in #bot-commands, sir!");
        }
        if(GM && botchannel){
            message.delete();
            const getAll = select.all(com);
            // message.channel.send(getAll);
            const embed = new Discord.RichEmbed()
            var fullList = '';
            embed.setTitle("info Command List")
            embed.setThumbnail("https://vignette.wikia.nocookie.net/oberin/images/e/e6/Oberinlogo.png/revision/latest?cb=20051204050716")
            embed.setColor(0x00AE86);
            getAll.forEach(function(dat){
                fullList += dat.id + " | " + dat.information + '\n';
            })
            embed.addField(getAll[0].command, fullList,true);
            return botchannel.send({embed});
            //console.log(getAll);
        }

        }
    //    }
    else if(action === 'list')
    {
        const getList = list.all();
        const embed = new Discord.RichEmbed()
        var fullList = '';
        embed.setTitle("info Commands List")
        embed.setThumbnail("https://vignette.wikia.nocookie.net/oberin/images/e/e6/Oberinlogo.png/revision/latest?cb=20051204050716")
        embed.setColor(0x00AE86);
        getList.forEach(function(dat){
            fullList += dat.command + '\n';
        })
        embed.addField('Commands', fullList,true);
        return message.channel.send({embed});
        //console.log(getList);
    }

    else if(action === 'delete')
    {
        if(!GM)
        {
            message.delete()
            return message.reply('Why should I listen to you?').then(msg => msg.delete(time));
        }
        if(GM && message.channel.name !== 'bot-commands')
        {
            message.delete()
            return message.author.send("Please use this command in #bot-commands, sir!");
        }
        if(GM && botchannel)
        {
            deleterow.run(com)
            return message.reply('Row has been removed from the table.')
        }

    }

    else
    {
        const getInfo = select.all(action)
        //console.log(getInfo.length);
        if(getInfo.length>0){
        return message.channel.send(getInfo[Rnd(getInfo.length)].information);
        }else{
            return message.channel.send('No such data.  Try using .info list'); 
        }

    }
    }





module.exports.help = {
    name:"info",
    category:"Fun"
}