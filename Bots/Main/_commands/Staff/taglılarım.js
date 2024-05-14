
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle ,Formatters } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const tagaldirstaff = require("../../../../Global/Database/SystemDB/tagaldir.staff")
const tagsistem = require("../../../../Global/Database/SystemDB/guildTag")
const missionsystem = require("../../../../Global/Database/SystemDB/mission.system")

class taglılarım extends Command {
    constructor(client) {
        super(client, {
            name: "taglılarım",
            description: "Kişinin tag aldırdığı kişileri gösterir.",
            usage: ".taglılarım (@Approval/ID)",
            category: "Staff",
            aliases: ["taglılarım","taglılar","taglilarim"],

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
  var sayi = 1
  var currentPage = 1
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const taglılardb = await tagaldirstaff.findOne({guildID:message.guild.id,userID:member.id});
    if(!taglılardb)return cevap(message,"tagliYok")
    var taglılar = [];
    for (let index = 0; index < taglılardb.users.length; index++) {
        sayi++
        const info = taglılardb.users[index];
        taglılar.push({UserID: info.memberId, Date:info.date})
    }
    let pages = taglılar.chunk(10)
    let geri = new ButtonBuilder().setCustomId('geri').setEmoji(await emojiBul("appEmoji_solOk")).setLabel("Önce ki Sayfa").setStyle(ButtonStyle.Secondary);
    let ileri = new ButtonBuilder().setCustomId('ileri').setEmoji(await emojiBul("appEmoji_sagOk")).setLabel("Sonra ki Sayfa").setStyle(ButtonStyle.Secondary)
    let carpi = new ButtonBuilder().setCustomId('cancel').setEmoji(await emojiBul("appEmoji_cop")).setLabel("Sayfaları Kapat").setStyle(ButtonStyle.Secondary)
    if(sayi < 5){
geri.setDisabled(true);
ileri.setDisabled(true);
}
message.channel.send({ components: [new ActionRowBuilder()
  .addComponents(
      geri,
    carpi,
      ileri

  )],embeds:[
  embed.setDescription(`${member}, toplamda **${taglılardb.count}** kişiyi taga davet etmişsin.`)
  .addFields({name:"Taglıların:",value:`${pages[currentPage - 1].map((x,index)=> `${index + 1}. ${message.guild.members.cache.get(x.UserID).user.tag} - <t:${(x.Date/1000).toFixed()}> (<t:${(x.Date/1000).toFixed()}:R>`)})`})
]})
  .then(async msg =>{
    var filter = (button) => button.user.id === message.author.id;
    const collector = msg.createMessageComponentCollector({ filter, time: 30000*2 })
    collector.on('collect', async (button, user) => {
        await button.deferUpdate();
    if (button.customId === "ileri") {
      if (currentPage == pages.length) return;
      currentPage++;
      await msg.edit({ components: [new ActionRowBuilder()
        .addComponents(
            geri,
           carpi,
            ileri
      
        )],embeds:[
        embed.setDescription(`${member}, toplamda **${taglılardb.count}** kişiyi taga davet etmişsin.`)
        .addFields({name:"Taglıların:",value:`${pages[currentPage - 1].map((x,index)=> `${index + 1}. ${message.guild.members.cache.get(x.UserID).name} - <t:${(x.Date/1000).toFixed()}> (<t:${(x.Date/1000).toFixed()}:R>`)})`})
      ]})
    }
    if (button.customId === "geri") {
      if (currentPage == pages.length) return;
      currentPage--;
      await msg.edit({ components: [new ActionRowBuilder()
        .addComponents(
            geri,
           carpi,
            ileri
      
        )],embeds:[
        embed.setDescription(`${member}, toplamda **${taglılardb.count}** kişiyi taga davet etmişsin.`)
        .addFields({name:"Taglıların:",value:`${pages[currentPage - 1].map((x,index)=> `${index + 1}. ${message.guild.members.cache.get(x.UserID).name} - <t:${(x.Date/1000).toFixed()}> (<t:${(x.Date/1000).toFixed()}:R>`)})`})
      ]})
    }
    if (button.customId === "geri"){
      if (button.customId === "cancel") {
        if (msg) msg.delete().catch(err => { });
        if (message) return message.delete().catch(err => { });
        await button.editReply({ content: `**Taglı Geçmişi Silindi!**`})
    }
    }
    })    
  })
}

} else  return cevap(message,"sistemKapali");
}else return cevap(message,"komutKullanamazsın")
}
}
module.exports = taglılarım;