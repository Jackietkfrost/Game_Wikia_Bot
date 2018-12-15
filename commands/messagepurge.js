const Discord = require("discord.js");



module.exports.help = {
    name:"purge",
    category:"Moderation",
    description:"Deletes messages. Can only reach 100 messages, and nothing past two weeks.",
    usage:".purge [1-100]"
}


module.exports.run = async (bot, message, args) => {
    message.delete();
    if(!message.member.roles.find(c=> c.name === "Game Master")) {
    message.channel.send('You need the \`Game Master\` role to use this command.'); // This tells the user in chat that they need the role.
        return;
    }
    if (isNaN(args[0])) {
        message.channel.send('Please use a number as your arguments. \n Usage: ' + prefix + 'purge <amount>');
        return;
    }
    if (args[0] > 100){
        message.channel.send('Cannot delete more than 100 messages.')
    }
    const fetched = await message.channel.fetchMessages({limit: args[0]});
    console.log(fetched.size + ' messages found, deleting...');
    message.channel.bulkDelete(fetched)
        .catch(error => message.channel.send(`Error: ${error}`));

}