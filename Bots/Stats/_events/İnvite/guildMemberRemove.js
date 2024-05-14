const { Collection, EmbedBuilder, PermissionsBitField,Formatters,ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const ms = require('ms');
const inviteSchema = require("../../../../Global/Database/invite/inviteSchema.js")
  const guildInviteSystemDB = require("../../../../Global/Database/SystemDB/guild.invite.system")
class MemberRemove extends Event {
    constructor(client) {
        super(client, {
            name: "guildMemberRemove",
            enabled: true,
        });
    }
    
 async onLoad(member) {

  const guildInviteSystem = await guildInviteSystemDB.findOne({guildID:member.guild.id});
  const guildInviteSystemControl = guildInviteSystem ? guildInviteSystem.InviteSystem : false; 
if(guildInviteSystemControl == true) {
  const invChannel = member.guild.channels.cache.get(channels.inviteLog);
  if(!invChannel) return console.log("İnv Log kanalı Bulunamadı!")
  let fakeControl = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7

  let inviteUser = await inviteSchema.findOne({ guildID: member.guild.id, userID: member.id })
  let inviter = client.users.cache.get(inviteUser.inviter)
  const solOk = await member.guild.emojis.cache.find(x=> x.name == "appEmoji_solOk")
  const carpi = await member.guild.emojis.cache.find(x=> x.name == "appEmoji_carpi")
  const tik = await member.guild.emojis.cache.find(x=> x.name == "appEmoji_tik")
  if(!inviter) {

      if(invChannel) invChannel.send({ content: `${solOk} **${member.user.tag}** <t:${Math.floor(Date.now() / 1000)}:R> sunucumuzdan ayrıldı, **ÖZEL URL** ile giriş yapmıştı. ${fakeControl === true ? "`❌`": ""}` })

  } else if(inviter.id === inviteUser.inviter) {
      await inviteSchema.findOneAndUpdate({ guildID: member.guild.id, userID: inviter.id }, { $inc: { total: -1, regular: -1, leave: 1 } }, { upsert: true })
      const data = await inviteSchema.findOne({ guildID: member.guild.id, userID: inviter.id });
      const toplam = data.total+data.bonus 
      if(invChannel) invChannel.send({ content: `${solOk} **${inviter.tag}** (**${toplam+1}**) daveti ile sunucuya katılan ${solOk}  **${member.user.tag}**, <t:${Math.floor(Date.now() / 1000)}:R> sunucudan ayrıldı. kalan daveti: **${toplam}** `});
  
  }
}
 }
}
module.exports = MemberRemove;