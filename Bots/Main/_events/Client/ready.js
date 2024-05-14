const { Event } = require("../../../../Global/Structures/Default.Events");
const chalk = require('chalk')
const {Guild} = require("../../../../Global/Config/Guild")
const { CronJob } = require("cron");
const {Collection} = require("discord.js")
const guildConfig = require("../../../../Global/Database/Guild.Config.js")
const guildRoles = require("../../../../Global/Database/Guild.Roles.Config")
const guildChannels = require("../../../../Global/Database/Guild.Channels.Config")
const penalty =require("../../../../Global/Database/penaltyDB/penaltys")
const tagsistem = require("../../../../Global/Database/SystemDB/guildTag")

class ready extends Event {
    constructor(client) {
        super(client, {
            name: "ready",
            enabled: true,
        });    
    }    

 async   onLoad() {
    allBots.push(client)

 _status([{name:Guild.botStatus, type:3}, ],["dnd","online","idle"],{on: false,activities: 5000,status: 30000})

        const guild = client.guilds.cache.get(Guild.ID)
        const guildSettings = await guildConfig.findOne({guildID: guild.id});
        const roles = global.roles = await guildRoles.findOne({guildID:guild.id});
        const channels = global.channels = await guildChannels.findOne({guildID:guild.id});
        const data = await tagsistem.findOne({guildID:guild.id});
        if(!data){ await tagsistem.findOneAndUpdate({guildID:guild.id},{$set:{only:false}},{upsert:true})}
        if(!guildSettings) {await guildConfig.findOneAndUpdate({guildID: guild.id}, {$set:{only:true}},{upsert:true})}
        const channel = guild.channels.cache.get(Guild.botVoiceChannel)
        voice.joinVoiceChannel({channelId: channel.id,guildId: channel.guild.id,adapterCreator: channel.guild.voiceAdapterCreator,});
        setInterval(async() => {voice.joinVoiceChannel({channelId: channel.id,guildId: channel.guild.id,adapterCreator: channel.guild.voiceAdapterCreator,});}, 15 * 1000);
        console.log(`[${tarihsel(Date.now())}] ${chalk.green.bgHex('#2f3236')(`Başarıyla Giriş Yapıldı: ${client.user.tag}`)}`)          
    }
}    


module.exports = ready;


function _status(activities, status, time) {
    if(!time.on) {
        client.user.setActivity(activities[0])
        client.user.setStatus(status[0])
    }  else {
        let i = 0;
        setInterval(() => {
            if(i >= activities.length) i = 0
            client.user.setActivity(activities[i])
            i++;
        }, time.activities);
    
        let s = 0;
        setInterval(() => {
            if(s >= activities.length) s = 0
            client.user.setStatus(status[s])
            s++;
        }, time.status);
    }
}

  async function  VoiceMuteControl(guild) {
    await penalty.find({guildID:guild.id}, async (err,data) => {
        data.filter(x=> x.penaltys.some(x=>x.type == "VOICE-MUTE" && x.Finished == false)).forEach(async veri => {
            veri.penaltys.forEach(async ceza => {
                let member = await guild.members.cache.get(ceza.Punished)
                if(member){
                if((roles && roles.voiceMutedRole) && !member.roles.cache.has(roles.chatMutedRole)) member.roles.add(roles.voiceMutedRole)               
                if(member && message.member.voice.mute == false) await member.voice.setMute(true);
                if(Date.now() > ceza.PenaltyEndTime) {
                if((roles && roles.voiceMutedRole) && member.roles.cache.has(roles.chatMutedRole)) member.roles.remove(roles.voiceMutedRole)
                if(member && message.member.voice.mute == true) await member.voice.setMute(false);
                await penalty.findOneAndUpdate({guildID:guild.id,cezaId:veri.cezaId},{$set:{penaltys:{Staff:ceza.Staff, Punished:ceza.Punished,SentencingDate:ceza.SentencingDate,PenaltyEndTime:ceza.PenaltyEndTime,Finished:true,type:ceza.type}}},{upsert:true})
                }
                }
            })
            if(channels.vMutedLog !=undefined && message.guild.channels.cache.get(channels.vMutedLog)) message.guild.channels.cache.get(channels.vMutedLog)
            .send({content:`${member} Ses kanallarındaki susturması <t:${(Date.now() / 1000).toFixed()}:R> sona erdiği için kaldırıldı.`})
           
        })
    })
  }