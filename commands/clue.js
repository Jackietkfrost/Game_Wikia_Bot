const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    var options = ["Lizards!", "Turtles?", "Have you tried poking Charnath?"];
    var response = options[Math.floor(Math.random()*options.length)];
    message.channel.send(response).then().catch(console.error);

    
}






module.exports.help = {
    name:"clue",
    category:"Utilities"
}