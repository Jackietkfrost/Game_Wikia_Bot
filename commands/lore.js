const Discord = require("discord.js");
const WikiaAPI = require('nodewikiaapi');
const oberinwiki = new WikiaAPI('oberin');
module.exports.help = {
    name:"lore",
    category:"Utilities",
    description:"Find out about the realm of Oberin.",
    usage:".lore"
}
    module.exports.run = async (bot, message, args) => {

        const Quote = ["Hrm... Let me look through my tomes...", "I've heard of that, hold on...", "I think I have a page here that can help..."];
        const randomQuote = Math.floor((Math.random() * Quote.length)+ 0);

        var LuskinMessage = message.channel.send(Quote[randomQuote]);
        LuskinMessage.then(msg => setTimeout(function(){doTheRest(bot, message,args,msg)},1500 ));
        


        
        function doTheRest(bot,message,args,msg){
            //console.log(JSON.stringify(args));
            let searchquery = (args.toString()).replace(/\s/g, "");
            const resolved = [`Ah! I've found your query, ${message.author}!`, `I believe I found something similar to what you asked of, ${message.author}.`, `Hrm.. Is this what you were looking for, ${message.author}?`];
            const randomResolve = Math.floor((Math.random() * resolved.length) + 0);
            const errRep = [`Sorry, I can't find what you are talking about.`]
         
    oberinwiki.getSearchList({query: searchquery}).then(data => {





        //message.channel.send(Quote[randomQuote]).then(msg => setTimeout(function(){msg.edit(resolved[randomResolve]), 5000}))
        let articleid = parseInt(data.items[0].id)
        let imagedata = 'https://vignette.wikia.nocookie.net/oberin/images/e/e6/Oberinlogo.png/revision/latest?cb=20051204050716';


        oberinwiki.getArticleAsSimpleJson({id: articleid}).then(articleData => {
            var x = 0;
    articleData.sections.forEach(function(data){
        //console.log (JSON.stringify(data))
        if(x==1){return;}
        if(data.images!=''){
            //console.log (data.images[0].src)
            imagedata = data.images[0].src;
            //console.log(imagedata);
            x = 1; 
        }
    
    });
//    console.log()

    let loreembed = new Discord.RichEmbed()
    .setTitle(data.items[0].title)
    .setURL(data.items[0].url)
    .setDescription(data.items[0].snippet.replace(/<\/span>/g, '').replace(/<span class="searchmatch">/g, '').replace(/\&hellip;/g, '...' ))
    .setThumbnail(imagedata)
    msg.edit(resolved[randomResolve]);
    message.channel.send(loreembed)
    }).catch(error => {
        console.error(error)
    })

})
.catch(error => {
    message.channel.send(errRep[0])


})
        }
}