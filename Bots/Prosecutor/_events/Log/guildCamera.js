const { Event } = require("../../../../Global/Structures/Default.Events");
const {EmbedBuilder} = require("discord.js")
class CameraStat extends Event {
    constructor(client) {
        super(client, {
            name: "voiceStateUpdate",
            enabled: true,
        });    
    }    

 async   onLoad(oldState, newState) {

    if((roles.unregisterRoles && (roles.unregisterRoles.some(x=> oldState.member.roles.cache.has(x)) || roles.unregisterRoles.some(x=> newState.member.roles.cache.has(x))))
    || (roles.bannedTagRole && (oldState.member.roles.cache.has(roles.bannedTagRole) || newState.member.roles.cache.has(roles.bannedTagRole))) 
    || (roles.jailedRole && (oldState.member.roles.cache.has(roles.jailedRole) && newState.member.roles.cache.has(roles.jailedRole))) 
    || (roles.suspectRole && (oldState.member.roles.cache.has(roles.suspectRole) || newState.member.roles.cache.has(roles.suspectRole)))) return;
    if ((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return;
    const startLog = await oldState.member.guild.channels.cache.find(x=> x.name == "camerastart_log");
    const stopLog = await oldState.member.guild.channels.cache.find(x=> x.name == "camerastart_log");
    if (((oldState.member.voice && newState.member.voice) && newState.member.voice.selfVideo == true)) {
        if(startLog)  return startLog.send({
            embeds:[
        new EmbedBuilder()
        .setAuthor({name:newState.member.user.tag,iconURL:newState.member.user.avatarURL({dynamic:true})})
        .setDescription(`\`${newState.member.user.tag}\` <t:${(Date.now()/1000).toFixed()}:R> **${channel.name}** isimli ses kanalında **Kamera** açtı!`)
            ]
        })
    } else if (((oldState.member.voice && newState.member.voice) && (oldState.member.voice.selfVideo == true && newState.member.voice.selfVideo == false))) {
      if(stopLog)return stopLog.send({
            embeds:[
        new EmbedBuilder()
        .setAuthor({name:newState.member.user.tag,iconURL:newState.member.user.avatarURL({dynamic:true})})
        .setDescription(`\`${newState.member.user.tag}\` <t:${(Date.now()/1000).toFixed()}:R> **${channel.name}** isimli ses kanalında **Kamera** kapattı!`)
            ]
        })
    }


    }
}    


module.exports = CameraStat;
