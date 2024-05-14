
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,TextInputStyle, SelectMenuBuilder,TextInputBuilder , Formatters} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const {Guild} = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Users")
const cezapuan = require("../../../../Global/Database/penaltyDB/cezapuan")
const penalty =require("../../../../Global/Database/penaltyDB/penaltys")
const mute = require("../../../../Global/Database/penaltyDB/mute")

const ms = require("ms");
class ChatUnMute extends Command {
    constructor(client) {
        super(client, {
            name: "C-unmute",
            description: "ID'si girilen kullanıcının metin kanallarındaki susturmasını açar.",
            usage: ".unmute @Approval/ID",
            category: "Moderasyon",
            aliases: ["susturmaac","unmute","cunmute"],
            enabled: true,
        });
    }
async onRequest (client, message, args,embed) {
if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [...roles.kurucuPerms,...roles.üstYönetimPerms,roles.chatMuteStaffRole].some(x=> message.member.roles.cache.has(x))){
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return  cevap(message,"memberYok")
    if (member.user.bot) return cevap(message,"bot")
    if (!member.manageable) return cevap(message,"yetersizYetki")
    if (member.roles.highest.position >= message.member.roles.highest.position && !client.owners.includes(message.author.id)) return cevap(message,"üstAynıYetki")
    var reason = args.splice(2).join(" ")
    if(!reason) reason = "Sebep Girilmedi."
    const data = await penalty.find();
    let cezakontrol = await data.filter(x=> x.penaltys.some(x=> x.type == "CHAT-MUTE" && x.Punished == member.id && x.Finished == false)).length < 0
    if(!member.roles.cache.has(roles.chatMutedRole) || cezakontrol) return message.reply({content:`**${member.user.tag}**, Aktif cezası bulunmadığı için bu işlem yapılamaz`})
    const ceza = await penalty.countDocuments().exec();
    await penalty.findOneAndUpdate({guildID: message.guild.id,userID:member.id,  cezaId: ceza+1}, {$set:{penaltys:{Staff:message.member.id, Punished:member.id, SentencingDate:Date.now(),Reason:reason, type:"CHAT-UNMUTE"}}},{upsert:true})
    
    await message.reply({content:`Susturma Açma (\`Chat UnMute\`) İşlemi Başarılı! \n "${member.id}" ID'li kullanıcı <t:${(Date.now() / 1000).toFixed()}> tarihinde (<t:${(Date.now() / 1000).toFixed()}:R>) metin kanallarında ki susturması açıldı!`})
    if(channels.cMutedLog !=undefined && message.guild.channels.cache.get(channels.cMutedLog)) message.guild.channels.cache.get(channels.cMutedLog)
    .send({embeds:[embed.setTitle(`#${ceza+1} Numaralı Yeni Ceza`).setDescription(`${member} (\`${member.id}\`), Sunucunun metin kanallarında bulunan susturması açıldı!`).addFields({name:`#${ceza+1} Numaraları Cezanin Detayları;`,value:`\`[•]\` **Yetkili:** ${message.member} (\`${message.member.user.tag} ▬ ${message.member.id}\`)\n\`[•]\`** Kullanıcı:** ${member} (\`${member.id}\`)\n\`[•]\`** İşlem:** Metin Kanallarında ki Susturma Kaldırıldı (Chat UnMute)\n\`[•]\`** Tarih:** <t:${(Date.now() / 1000).toFixed()}> (<t:${(Date.now() / 1000).toFixed()}:R>)\n\`[•]\`**  Sebep:** ${reason}`})]})
    await mute.findOneAndUpdate({guildID:message.guild.id, userID:message.member.id},{$inc:{limit:1,unmute:1},$push:{mutes:{Punished:member.id, SentencingDate:Date.now(), Type:"C-UNMUTE", Reason:reason,Finished:false}}},{upsert:true})
    await cezapuan.findOneAndUpdate({guildID:message.guild.id,userID:member.id}, {$inc:{cezapuan:-10}},{upsert:true})
    let cezapuandata = await cezapuan.findOne({guildID:message.guild.id,userID:member.id})
    if(channels.penaltyPointsLog !=undefined && message.guild.channels.cache.get(channels.penaltyPointsLog)) message.guild.channels.cache.get(channels.penaltyPointsLog)
    .send({content:`**${member} Ceza puanın güncellendi!** mevcut ceza puanın **${cezapuandata ? cezapuandata.cezapuan : 0}**`})
    await cezaç(message.guild,member,message.member)

} else return cevap(message,"komutKullanamazsın")
}
}
async function cezaç(guild,member,staff){
    await penalty.find({guildID:guild.id,userID:member.id}, async (err,data) => {
        data.filter(x=> x.penaltys.some(x=>x.type == "CHAT-MUTE" && x.Finished == false)).forEach(async veri => {
            veri.penaltys.forEach(async ceza => {
                if(member.roles.cache.has(roles.chatMutedRole)) member.roles.remove(roles.chatMutedRole)
                await penalty.findOneAndUpdate({guildID:guild.id,cezaId:veri.cezaId},{$set:{penaltys:{Staff:ceza.Staff, Punished:ceza.Punished,SentencingDate:ceza.SentencingDate,PenaltyEndTime:ceza.PenaltyEndTime,Finished:true,type:ceza.type}}},{upsert:true})
            })
       
        })
        if(channels.cMutedLog !=undefined && guild.channels.cache.get(channels.cMutedLog)) guild.channels.cache.get(channels.cMutedLog)
        .send({content:`${member} Ses kanallarındaki susturması ${staff} tarafından <t:${(Date.now() / 1000).toFixed()}:R> kaldırıldı.`})
       
        })
}
module.exports = ChatUnMute;