const { Event } = require("../../../../Global/Structures/Default.Events");
const chalk = require('chalk')
const {Guild} = require("../../../../Global/Config/Guild")
const { CronJob } = require("cron");
const {Collection} = require("discord.js")
const guildConfig = require("../../../../Global/Database/Guild.Config.js")
const guildSystemConfig = require("../../../../Global/Database/SystemDB/GuildLevelSystem")
const guildRoles = require("../../../../Global/Database/Guild.Roles.Config")
const guildChannels = require("../../../../Global/Database/Guild.Channels.Config")
const cezapuan = require("../../../../Global/Database/penaltyDB/cezapuan")
const penalty =require("../../../../Global/Database/penaltyDB/penaltys")
const mute = require("../../../../Global/Database/penaltyDB/mute")

class JailControl extends Event {
    constructor(client) {
        super(client, {
            name: "ready",
            enabled: true,
        });    
    }    

 async   onLoad() {
const guild = await client.guilds.cache.get(Guild.ID)
setInterval(async() => {
penalty.find({guildID:guild.id}, async (err,data) => {
        if(!data) return;
        data.filter(x=> x.penaltys.some(x=>x.type == "JAIL" && x.Finished == false)).forEach(async veri => {
            veri.penaltys.forEach(async ceza => {
                let member = await guild.members.cache.get(ceza.Punished)
                if(member){
                 if(Date.now() > ceza.PenaltyEndTime){   
                await member.roles.set(ceza.Roles)
                await penalty.findOneAndUpdate({guildID:guild.id,cezaId:veri.cezaId},{$set:{penaltys:{Staff:ceza.Staff, Punished:ceza.Punished,SentencingDate:ceza.SentencingDate,PenaltyEndTime:ceza.PenaltyEndTime,Finished:true,type:ceza.type,Reason:ceza.Reason}}},{upsert:true})
                if(channels.jailedLog !=undefined && guild.channels.cache.get(channels.jailedLog)) guild.channels.cache.get(channels.jailedLog)
                .send({content:`${member}, Metin ve Ses kanallarındaki uzaklaştırması <t:${(Date.now() / 1000).toFixed()}:R> sona erdiği için kaldırıldı.`})
            }}
            })
       
        })

        })
}, 1000*10);
    }
}    

module.exports = JailControl;
