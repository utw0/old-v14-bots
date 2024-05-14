const { Event } = require("../../../../Global/Structures/Default.Events");
const guildSystemConfig = require("../../../../Global/Database/SystemDB/guild.stat.system");
const streamOpenedAt = require("../../../../Global/Database/Stats/Streamer/streamOpenedAt");
class voiceStreamingStart extends Event {
    constructor(client) {
        super(client, {
            name: "voiceStreamingStart",
            enabled: true,
        });
    }
    
 async onLoad(member, channel) {
        const statSystemControl = await guildSystemConfig.findOne({guildID:channel.guild.id});
        var kontrol = statSystemControl ? statSystemControl.statSystem : false;
        if(kontrol == true){
          if((roles.unregisterRoles && (roles.unregisterRoles.some(x=> member.roles.cache.has(x)) || roles.unregisterRoles.some(x=> member.roles.cache.has(x))))
          || (roles.bannedTagRole && (member.roles.cache.has(roles.bannedTagRole) || member.roles.cache.has(roles.bannedTagRole))) 
          || (roles.jailedRole && (member.roles.cache.has(roles.jailedRole) && member.roles.cache.has(roles.jailedRole))) 
          || (roles.suspectRole && (member.roles.cache.has(roles.suspectRole) || member.roles.cache.has(roles.suspectRole)))) return;
          if ((member && member.user.bot) || (member && member.user.bot)) return;
    
          await streamOpenedAt.findOneAndUpdate({ userID: member.id }, { $set: { date: Date.now() } }, { upsert: true });
        }
    }
}

module.exports = voiceStreamingStart
