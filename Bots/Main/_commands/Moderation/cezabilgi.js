
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,TextInputStyle, SelectMenuBuilder,TextInputBuilder , Formatters} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const {Guild} = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Users")
const cezapuan = require("../../../../Global/Database/penaltyDB/cezapuan")
const penalty =require("../../../../Global/Database/penaltyDB/penaltys")
const bans = require("../../../../Global/Database/penaltyDB/ban")
const ms = require("ms");
class Cezabilgi extends Command {
    constructor(client) {
        super(client, {
            name: "Cezabilgi",
            description: "ID'si girilen ceza bilgilerini gösterir.",
            usage: ".cezabilgi CezaID",
            category: "Moderasyon",
            aliases: ["cb","cezabilgi"],
            enabled: true,
        });
    }
async onRequest (client, message, args,embed) {
if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [...roles.kurucuPerms,...roles.üstYönetimPerms,...roles.ortaYönetimPerms,...roles.altYönetimPerms].some(x=> message.member.roles.cache.has(x))){
      const hata = message.guild.emojis.cache.find(x=> x.name =="appEmoji_unlem") ? message.guild.emojis.cache.find(x=> x.name =="appEmoji_unlem") : `**[ __Hata__ ]** \` | \``
        const hataEmbed =  new EmbedBuilder()
        .setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
        .setColor("Red")
        .setFooter({text: "Developed By Luppux | Hata olduğunu düşünüyorsan geliştirici ile iletişime geç!", iconURL: message.guild.members.cache.get(client.owners[0]).user.avatarURL({dynamic:true})});
    let cezaID = args[0]
    if(!cezaID || !Number(cezaID)) return message.reply({embeds:[hataEmbed.setDescription(`${hata} Lütfen sayı olucak şekilde tekrar deneyiniz. (\`.cezabilgi 31\`)`)]}).then(async msg =>{
        setTimeout(async() => {
          if(msg && msg.deletable) await msg.delete();
          if(message && message.deletable) await message.delete();
        }, 10000);
      })     
    const data = await penalty.findOne({guildID:message.guild.id,cezaId:cezaID})
    let a = await penalty.countDocuments().exec();
    if(!data) return message.reply({embeds:[hataEmbed.setDescription(`${hata} Girilen ceza id'sine ait veriler bulunamadı. Toplam **${a}** ceza id'si bulunuyor.`)]}).then(async msg =>{
        setTimeout(async() => {
          if(msg && msg.deletable) await msg.delete();
          if(message && message.deletable) await message.delete();
        }, 10000);
      })
    message.reply({embeds:[
        new EmbedBuilder()
        .setAuthor({name:message.guild.id, iconURL:message.guild.iconURL({dynamic:true})})
        .setDescription(`**#${cezaID}**, Numaralı cezanin detayları aşağıda verilmiştir.`)
        .addFields({name:"** **",value:
`\`[•]\` **Yetkili:** <@${data.penaltys[0].Staff}> - (\`${data.penaltys[0].Staff}\`)
\`[•]\` **Kullanıcı:** <@${data.penaltys[0].Punished}> - (\`${data.penaltys[0].Punished}\`)
\`[•]\` **Cezası:** ${data.penaltys[0].type}
\`[•]\` **Durum:** ${data.penaltys[0].Finished == true ? "Bitmiş":`<t:${(data.penaltys[0].PenaltyEndTime/1000).toFixed()}:R>`}
\`[•]\` **Sebep:** ${data.penaltys[0].Reason}
`
})
        
    ]})

} else return cevap(message,"komutKullanamazsın")
}
}
module.exports = Cezabilgi;