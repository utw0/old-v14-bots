const { Event } = require("../../../../Global/Structures/Default.Events");
const chalk = require('chalk')
const {Guild} = require("../../../../Global/Config/Guild")
const missionsystem = require("../../../../Global/Database/SystemDB/mission.system")
const guildAutoStaffdb = require("../../../../Global/Database/SystemDB/guild.auto.staff")

class MissionsMessage extends Event {
    constructor(client) {
        super(client, {
            name: "messageCreate",
            enabled: true,
        });    
    }    

 async   onLoad(message) {
  if(message.author.bot || (roles.unregisterRoles && roles.unregisterRoles.some(x=> message.member.roles.cache.has(x))) || (roles.bannedTagRole && message.member.roles.cache.has(roles.bannedTagRole)) || (roles.jailedRole && message.member.roles.cache.has(roles.jailedRole)) || (roles.suspectRole && message.member.roles.cache.has(roles.suspectRole))) return;
if(channels.chatChannel && message.channel.id == channels.chatChannel) {
  let missionsystemdb = await missionsystem.findOne({guildID:message.guild.id});
let mission_system = missionsystemdb ? missionsystemdb.only : false;
if(mission_system == true){

  var guildAutoStaff = await guildAutoStaffdb.findOne({guildID:message.guild.id,userID:message.member.id})
  const authorityStatus = guildAutoStaff ? guildAutoStaff.authorityStatus : false
  if(authorityStatus == true) {
await missionsystem.findOneAndUpdate({guildID:message.guild.id,userID:message.member.id},{$inc:{messageTask:1}},{upsert:true})
await missionsControled(message.member.id,message.guild.id,"Mesaj")
  }

}
}

    }
}    
module.exports = MissionsMessage;


  