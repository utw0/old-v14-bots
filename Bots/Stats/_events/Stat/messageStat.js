const { Event } = require("../../../../Global/Structures/Default.Events");
const messageUser = require("../../../../Global/Database/Stats/Message/messageUser")
const messageGuild = require("../../../../Global/Database/Stats/Message/messageGuild")
const guildChannel = require("../../../../Global/Database/Stats/Message/messageGuildChannel")
const userChannel = require("../../../../Global/Database/Stats/Message/messageUserChannel")
const guildSystemConfig = require("../../../../Global/Database/SystemDB/guild.stat.system")
class messageCreate extends Event {
    constructor(client) {
        super(client, {
            name: "messageCreate",
            enabled: true,
        });    
    }    

 async   onLoad(message) {

  const statSystemControl = await guildSystemConfig.findOne({guildID:message.guild.id});
  var ControlStats = statSystemControl ? statSystemControl.statSystem : false;
  if(ControlStats == true){
    if(message.author.bot || (roles.unregisterRoles && roles.unregisterRoles.some(x=> message.member.roles.cache.has(x))) || (roles.bannedTagRole && message.member.roles.cache.has(roles.bannedTagRole)) || (roles.jailedRole && message.member.roles.cache.has(roles.jailedRole)) || (roles.suspectRole && message.member.roles.cache.has(roles.suspectRole))) return;
    await messageUser.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { dailyStat: 1, weeklyStat: 1, twoWeeklyStat: 1,totalStat: 1  } }, { upsert: true });
    await messageGuild.findOneAndUpdate({ guildID: message.guild.id }, { $inc: { dailyStat: 1, weeklyStat: 1, twoWeeklyStat: 1,totalStat:1 } }, { upsert: true });
    await guildChannel.findOneAndUpdate({ guildID: message.guild.id, channelID: message.channel.id }, { $inc: { channelData: 1 } }, { upsert: true });
    await userChannel.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id, channelID: message.channel.id }, { $inc: { channelData: 1 } }, { upsert: true });
  } else {
    undefined;
  }

    }
}    
module.exports = messageCreate;


  