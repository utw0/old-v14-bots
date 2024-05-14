const { Collection, EmbedBuilder, PermissionsBitField } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const cooldown = new Collection();
const ms = require('ms');
const guildSystemConfig = require("../../../../Global/Database/SystemDB/guild.stat.system");
const voiceJoinedAt = require('../../../../Global/Database/Stats/Voice/voiceJoinedAt');
class voiceChannelSwitch extends Event {
    constructor(client) {
        super(client, {
            name: "voiceChannelSwitch",
            enabled: true,
        });
    }
    
 async onLoad(member, oldChannel, newChannel) {
            const statSystemControl = await guildSystemConfig.findOne({guildID:oldChannel.guild.id});
            var kontrol = statSystemControl ? statSystemControl.statSystem : false;
            if(kontrol == true){
              if((roles.unregisterRoles && (roles.unregisterRoles.some(x=> member.roles.cache.has(x)) || roles.unregisterRoles.some(x=> member.roles.cache.has(x))))
              || (roles.bannedTagRole && (member.roles.cache.has(roles.bannedTagRole) || member.roles.cache.has(roles.bannedTagRole))) 
              || (roles.jailedRole && (member.roles.cache.has(roles.jailedRole) && member.roles.cache.has(roles.jailedRole))) 
              || (roles.suspectRole && (member.roles.cache.has(roles.suspectRole) || member.roles.cache.has(roles.suspectRole)))) return;
              if ((member && member.user.bot) || (member && member.user.bot)) return;
              var joinedAtData = await voiceJoinedAt.findOne({ userID: member.id });
              if (!joinedAtData){
              await voiceJoinedAt.findOneAndUpdate({ userID: member.id }, { $set: { date: Date.now() } }, { upsert: true });
              joinedAtData = await voiceJoinedAt.findOne({ userID: member.id });
            }
            const data = Date.now() - joinedAtData.date;
            await saveStats("voice",member, oldChannel, data);
            await voiceJoinedAt.findOneAndUpdate({ userID: member.id }, { $set: { date: Date.now() } }, { upsert: true });        
            }
    }
}

module.exports = voiceChannelSwitch
