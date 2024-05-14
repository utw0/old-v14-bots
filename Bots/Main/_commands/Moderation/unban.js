
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,TextInputStyle, SelectMenuBuilder,TextInputBuilder , Formatters} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const {Guild} = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Users")
const cezapuan = require("../../../../Global/Database/penaltyDB/cezapuan")
const penalty =require("../../../../Global/Database/penaltyDB/penaltys")
const bans = require("../../../../Global/Database/penaltyDB/ban")
const ms = require("ms");
class unBan extends Command {
    constructor(client) {
        super(client, {
            name: "unban",
            description: "ID'si girilen kullanıcının yasağını kaldırır.",
            usage: ".unban ID",
            category: "Moderasyon",
            aliases: ["bankaldir","bankaldır"],

            enabled: true,
        });
    }
async onRequest (client, message, args,embed) {
if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [...roles.kurucuPerms,...roles.üstYönetimPerms,roles.banStaffRole].some(x=> message.member.roles.cache.has(x))){
      const hata = message.guild.emojis.cache.find(x=> x.name =="appEmoji_unlem") ? message.guild.emojis.cache.find(x=> x.name =="appEmoji_unlem") : `${hata}`

        const hataEmbed =  new EmbedBuilder()
        .setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
        .setColor("Red")
    const id = args[0];
    var reason = args.splice(1).join(" ")
    if(!reason) reason = "Sebep Girilmedi."
    if(!id) return  message.reply({embeds:[hataEmbed.setDescription(`${hata} Yasağını kaldırmak istediğiniz kullanıcının ID'sini girmeniz gerekiyor.`)]}).then(async msg =>{
        setTimeout(async() => {
          if(msg && msg.deletable) await msg.delete();
          if(message && message.deletable) await message.delete();
        }, 10000);
      })
    if(!message.guild.bans.cache.find(x=> x.user.id == id)) return message.reply({embeds:[hataEmbed.setDescription(`${hata} ID'si girilen kullanıcının yasağı bulunamadı.`)]}).then(async msg =>{
        setTimeout(async() => {
          if(msg && msg.deletable) await msg.delete();
          if(message && message.deletable) await message.delete();
        }, 10000);
      })
    if(message.guild.bans.cache.find(x=> x.user.id == id)) {
    const cezaId = await penalty.countDocuments().exec();
    await penalty.findOneAndUpdate({guildID: message.guild.id,userID:id,  cezaId: cezaId+1}, {$set:{penaltys:{Staff:message.member.id, Punished:id, SentencingDate:Date.now(),Reason:reason, type:"UNBAN"}}},{upsert:true})
    await message.guild.members.unban(id, {reason:`Yasak ${message.member.user.tag} Tarafından Kaldırıldı!`})
    await message.reply({content:`Ban Kaldırma İşlemi Başarılı! \n "${id}" ID'li kullanıcının yasağı <t:${(Date.now() / 1000).toFixed()}> tarihinde (<t:${(Date.now() / 1000).toFixed()}:R>) kaldırıldı!`})
    if(channels.bannedLog !=undefined && message.guild.channels.cache.get(channels.bannedLog)) message.guild.channels.cache.get(channels.bannedLog)
    .send({embeds:[
        embed
        .setTitle(`#${cezaId+1} Numaralı Yeni Ceza`)
        .setDescription(`<@${id}> (\`${id}\`), Mevcut yasaklandırması kaldırıldı!`)
        .addFields({name:`#${cezaId+1} Numaraları Cezanin Detayları;`,value:`\`[•]\` **Yetkili:** ${message.member} (\`${message.member.user.tag} ▬ ${message.member.id}\`)\n\`[•]\`** Kullanıcı: **<@${id}> (\`${id}\`)\n\`[•]\`** İşlem:** Yasak Kaldırma (Unban)\n\`[•]\`** Tarih:** <t:${(Date.now() / 1000).toFixed()}> (<t:${(Date.now() / 1000).toFixed()}:R>)\n\`[•]\`** Sebep:** ${reason}`})]})
    await bans.findOneAndUpdate({guildID:message.guild.id, userID:message.member.id},{$inc:{limit:1,unban:1},$push:{bans:{Punished:id, SentencingDate:Date.now(), Type:"UNBAN", Reason:reason }}},{upsert:true})
    await cezapuan.findOneAndUpdate({guildID:message.guild.id,userID:id}, {$inc:{cezapuan:-25}},{upsert:true})
    let cezapuandata = await cezapuan.findOne({guildID:message.guild.id,userID:id})
    if(channels.penaltyPointsLog !=undefined && message.guild.channels.cache.get(channels.penaltyPointsLog)) message.guild.channels.cache.get(channels.penaltyPointsLog)
    .send({content:`**<@${id}> Ceza puanın güncellendi!.** mevcut ceza puanın **${cezapuandata ? cezapuandata.cezapuan : 0}**`})
    }
} else return cevap(message,"komutKullanamazsın")
}
}
module.exports = unBan;