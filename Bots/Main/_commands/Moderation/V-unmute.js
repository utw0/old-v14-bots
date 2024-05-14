
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,TextInputStyle, SelectMenuBuilder,TextInputBuilder , Formatters} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const {Guild} = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Users")
const cezapuan = require("../../../../Global/Database/penaltyDB/cezapuan")
const penalty =require("../../../../Global/Database/penaltyDB/penaltys")
const vmute = require("../../../../Global/Database/penaltyDB/vmute")

const ms = require("ms");
class VoiceUnMute extends Command {
    constructor(client) {
        super(client, {
            name: "V-unmute",
            description: "ID'si girilen kullanıcının metin kanallarındaki susturmasını açar.",
            usage: ".vunmute @Approval/ID",
            category: "Moderasyon",
            aliases: ["unvmute","vunmute"],
            enabled: true,
        });
    }
async onRequest (client, message, args,embed) {
if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [...roles.kurucuPerms,...roles.üstYönetimPerms,roles.voiceMuteStaffRole].some(x=> message.member.roles.cache.has(x))){
        const hata = message.guild.emojis.cache.find(x=> x.name =="appEmoji_unlem") ? message.guild.emojis.cache.find(x=> x.name =="appEmoji_unlem") : `**[ __Hata__ ]** \` | \``

    const hataEmbed =  new EmbedBuilder()
    .setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
    .setColor("Red")
    .setFooter({text: "Developed By Luppux | Hata olduğunu düşünüyorsan geliştirici ile iletişime geç!", iconURL: message.guild.members.cache.get(client.owners[0]).user.avatarURL({dynamic:true})});
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return  cevap(message,"memberYok")
    if (member.user.bot) return cevap(message,"bot")
    if (!member.manageable) return cevap(message,"yetersizYetki")
    if (member.roles.highest.position >= message.member.roles.highest.position && !client.owners.includes(message.author.id)) return cevap(message,"üstAynıYetki")
    var reason = args.splice(2).join(" ")
    if(!reason) reason = "Sebep Girilmedi."
    const data = await penalty.find();
    let cezakontrol = await data.filter(x=> x.penaltys.some(x=> x.type == "CHAT-MUTE" && x.Punished == member.id && x.Finished == false)).length < 0
    if(!member.roles.cache.has(roles.voiceMutedRole) || cezakontrol) return message.reply({embeds:[hataEmbed.setDescription(`${hata} **${member.user.tag}**, Aktif cezası bulunmadığı için bu işlem yapılamaz`)]}).then(async msg =>{
        setTimeout(async() => {
          if(msg && msg.deletable) await msg.delete();
          if(message && message.deletable) await message.delete();
        }, 10000);
      })
    if(member.voice.mute == false) return message.reply({content:`**${member.user.tag}** Ses kanallarında susturması bulunamadı.`})
    const ceza = await penalty.countDocuments().exec();
    await penalty.findOneAndUpdate({guildID: message.guild.id,userID:member.id,  cezaId: ceza+1}, {$set:{penaltys:{Staff:message.member.id, Punished:member.id, SentencingDate:Date.now(),Reason:reason, type:"CHAT-UNMUTE"}}},{upsert:true})
    await member.voice.setMute(false).catch(() => {});
    await message.reply({content:`Susturma Açma (\`Voice UnMute\`) İşlemi Başarılı! \n "${member.id}" ID'li kullanıcı <t:${(Date.now() / 1000).toFixed()}> tarihinde (<t:${(Date.now() / 1000).toFixed()}:R>) metin kanallarında ki susturması açıldı!`})
    if(channels.vMutedLog !=undefined && message.guild.channels.cache.get(channels.vMutedLog)) message.guild.channels.cache.get(channels.vMutedLog)
    .send({embeds:[embed.setTitle(`#${ceza+1} Numaralı Yeni Ceza`).setDescription(`${member} (\`${member.id}\`), Sunucunun metin kanallarında bulunan susturması açıldı!`).addFields({name:`#${ceza+1} Numaraları Cezanin Detayları;`,value:`\`[•]\` **Yetkili:** ${message.member} (\`${message.member.user.tag} ▬ ${message.member.id}\`)\n\`[•]\`** Kullanıcı:** ${member} (\`${member.id}\`)\n\`[•]\`** İşlem:** Metin Kanallarında ki Susturma Kaldırıldı (Voice UnMute)\n\`[•]\`** Tarih:** <t:${(Date.now() / 1000).toFixed()}> (<t:${(Date.now() / 1000).toFixed()}:R>)\n\`[•]\`**  Sebep:** ${reason}`})]})
    await vmute.findOneAndUpdate({guildID:message.guild.id, userID:message.member.id},{$inc:{limit:1,unvmute:1},$push:{vmutes:{Punished:member.id, SentencingDate:Date.now(), Type:"C-UNMUTE", Reason:reason,Finished:false}}},{upsert:true})
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
        data.filter(x=> x.penaltys.some(x=>x.type == "VOICE-MUTE" && x.Finished == false)).forEach(async veri => {
            veri.penaltys.forEach(async ceza => {
                if((roles && roles.voiceMutedRole) && member.roles.cache.has(roles.voiceMutedRole)) member.roles.remove(roles.voiceMutedRole)
                if(member && message.member.voice.mute == true) await member.voice.setMute(false);
                await penalty.findOneAndUpdate({guildID:guild.id,cezaId:veri.cezaId},{$set:{penaltys:{Staff:ceza.Staff, Punished:ceza.Punished,SentencingDate:ceza.SentencingDate,PenaltyEndTime:ceza.PenaltyEndTime,Finished:true,type:ceza.type}}},{upsert:true})
            })
       
        })
        if(channels.vMutedLog !=undefined && message.guild.channels.cache.get(channels.vMutedLog)) message.guild.channels.cache.get(channels.vMutedLog)
        .send({content:`${member} Ses kanallarındaki susturması ${staff} tarafından <t:${(Date.now() / 1000).toFixed()}:R> kaldırıldı.`})
        })
}
module.exports = VoiceUnMute;