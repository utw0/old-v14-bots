
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const tagaldir = require("../../../../Global/Database/SystemDB/tagaldir")
const tagaldirstaff = require("../../../../Global/Database/SystemDB/tagaldir.staff")
const missionsystem = require("../../../../Global/Database/SystemDB/mission.system")

const tagsistem = require("../../../../Global/Database/SystemDB/guildTag")
class tagaldircmd extends Command {
    constructor(client) {
        super(client, {
            name: "tagaldir",
            description: "kişinin tag aldırdığı kişileri işaretlemek için kullanlır.",
            usage: ".tagaldir",
            category: "Staff",
            aliases: ["tagal","tagaldir","taglı"],

            enabled: true,
 
            });
    }
async onRequest (client, message, args,embed) {
    if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [...roles.kurucuPerms,...roles.üstYönetimPerms,...roles.ortaYönetimPerms,...roles.altYönetimPerms,roles.registerStaffRole].some(x=> message.member.roles.cache.has(x))){
const data = await tagsistem.findOne({guildID:message.guild.id});      
const a = data.only 
if(a == true) {
  let missionsystemdb = await missionsystem.findOne({guildID:message.guild.id});
let mission_system = missionsystemdb ? missionsystemdb.only : false;
if(mission_system == true){
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!member) return cevap(message,"memberYok")
  if(!member || member.id == message.member.id) return cevap(message,"kendisi")
  if(!member.user.username.includes(data.Tag)) return message.reply({content:"Kullanıcı tagımıza sahip değil."})
  const tagaldirdb = await tagaldir.findOne({guildID:message.guild.id,userID:member.id})
  const only = tagaldirdb ? tagaldirdb.only : false;
  if(only == true) return message.reply({embeds:[embed.setDescription(`**${member.user.tag}**, <@${tagaldirdb.Staff}> tarafından <t:${(tagaldirdb.Date/1000).toFixed()}> (<t:${(tagaldirdb.Date/1000).toFixed()}:R>) Taglı olarak işaretlenmiş.`)]})
  if(!member.roles.cache.has(data.tagRol)) await member.roles.add(data.tagRol)
  const row = new ActionRowBuilder()
  .addComponents(
   new ButtonBuilder().setCustomId("evet").setLabel("Evet").setEmoji(emojiBul("appEmoji_tik")).setStyle(ButtonStyle.Secondary),
   new ButtonBuilder().setCustomId("hayir").setLabel("Hayır").setEmoji(emojiBul("appEmoji_carpi")).setStyle(ButtonStyle.Secondary),
  )
 let msg = await message.channel.send({content:`[${member}]`,components:[row],embeds:[embed.setDescription(`${message.member} tarafından tag aldığını kabul ediyo musun ?`)]});
 var filter = (button) => button.user.id === member.id;
const collector = msg.createMessageComponentCollector({ filter, time: 30000 });
collector.on('collect', async (i) => {
await i.deferUpdate();
if(i.customId == "evet"){
await tagaldir.findOneAndUpdate({guildID:message.guild.id,userID:member.id},{$set:{only:true,Date:Date.now(),Staff:message.member.id}},{upsert:true});
await tagaldirstaff.findOneAndUpdate({guildID:message.guild.id,userID:message.member.id},{$inc:{count:1},$push:{users:{memberId:member.id,date:Date.now()}}},{upsert:true})
message.reply({embeds:[embed.setDescription(`${member} <t:${(Date.now()/1000).toFixed()}> tarihinde **Taglı** olarak işaretlendi!`)]})
  await missionsystem.findOneAndUpdate({guildID:message.guild.id,userID:message.member.id},{$inc:{tagInviteTask:1}},{upsert:true})
  await missionsControled(message.member.id,message.guild.id,"Taglı")
if (msg) await msg.delete()
if(message) await message.delete();
}
if(i.customId == "hayir"){
message.reply({content:"`Reddedildi!`"})
if (msg) await msg.delete()
if(message) await message.delete();
}

})
collector.on("end", async (collected, reason) => {
  if (reason === "time") {
    if (msg) await msg.delete()
    if(message) await message.delete();
  }
});
}
 
} else  return cevap(message,"sistemKapali");
}else  return cevap(message,"komutKullanamazsın");
}
}
module.exports = tagaldircmd;