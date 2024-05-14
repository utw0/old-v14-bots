const { Event } = require("../../../../Global/Structures/Default.Events");
const guildSystemConfig = require("../../../../Global/Database/SystemDB/guild.stat.system");
const cameraOpenedAt = require("../../../../Global/Database/Stats/Camera/cameraOpenedAt");
class CameraStat extends Event {
    constructor(client) {
        super(client, {
            name: "voiceStateUpdate",
            enabled: true,
        });    
    }    

 async   onLoad(oldState, newState) {
  const statSystemControl = await guildSystemConfig.findOne({guildID:oldState.guild.id});
  var kontrol = statSystemControl ? statSystemControl.statSystem : false;
  if(kontrol == true){
    if((roles.unregisterRoles && (roles.unregisterRoles.some(x=> oldState.member.roles.cache.has(x)) || roles.unregisterRoles.some(x=> newState.member.roles.cache.has(x))))
    || (roles.bannedTagRole && (oldState.member.roles.cache.has(roles.bannedTagRole) || newState.member.roles.cache.has(roles.bannedTagRole))) 
    || (roles.jailedRole && (oldState.member.roles.cache.has(roles.jailedRole) && newState.member.roles.cache.has(roles.jailedRole))) 
    || (roles.suspectRole && (oldState.member.roles.cache.has(roles.suspectRole) || newState.member.roles.cache.has(roles.suspectRole)))) return;
    if ((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return;

    if ((newState.member.voice && newState.member.voice.selfVideo == true)) {
      await cameraOpenedAt.findOneAndUpdate({ userID: newState.id }, { $set: { date: Date.now() } }, { upsert: true });
    } else if ( (newState.member.voice && newState.member.voice.selfVideo == false)) {
      let cameraOpenedAtData = await cameraOpenedAt.findOne({ userID: oldState.id });
      if (!cameraOpenedAtData){
       await cameraOpenedAt.findOneAndUpdate({ userID: oldState.id }, { $set: { date: Date.now() } }, { upsert: true });
      cameraOpenedAtData = await cameraOpenedAt.findOne({ userID: oldState.id });
      }
      const data = Date.now() - cameraOpenedAtData.date;
      await saveStats("camera",oldState, oldState.channel, data);
      await cameraOpenedAt.findOneAndDelete({ userID: oldState.id }, { upsert: true });
    }
  } else {
    return undefined;
  }

    }
}    


module.exports = CameraStat;
