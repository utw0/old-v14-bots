const { Event } = require("../../../../Global/Structures/Default.Events");
const {Guild} = require("../../../../Global/Config/Guild")
const request = require('request');
const guard = require("../../../../Global/Database/Guard")
const fetch = require("node-fetch");
class urlSpammber extends Event {
    constructor(client) {
        super(client, {
            name: "ready",
            enabled: true,
        });    
    }    

 async   onLoad() {
    setInterval(async() => {
      const guild = client.guilds.cache.get(Guild.ID)
      var guardData = await guard.findOne({guildID:guild.id})
      var urlSpammerOnly = guardData ? guardData.UrlSpammer : false
      if(urlSpammerOnly == true){
        const config = {
            url: `https://discord.com/api/v9/guilds/${guild.id}/vanity-url`,
            body: {
                code: Guild.vanityURL
            },
            method: 'PATCH',
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": ""
            }
        }
      let req = await fetch(config.url, { method: config.method, headers: config.headers, body: JSON.stringify(config.body) }) 
      req = await req.json();     
     }
    }, 60000);
    }
}    
module.exports = urlSpammber;
