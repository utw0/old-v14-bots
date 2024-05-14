
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
class Sil extends Command {
    constructor(client) {
        super(client, {
            name: "Sil",
            description: "Sunucudaki kullanıcılar hakkında bilgi verir.",
            usage: ".sil",
            category: "Approval",
            aliases: ["temizle","sil"],
            enabled: true,  
            });
    }
 async onRequest (client, message, args,embed) {
  if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
  ||
  [...roles.kurucuPerms,...roles.üstYönetimPerms,roles.banStaffRole].some(x=> message.member.roles.cache.has(x))){
let miktar = args[0];
if(!miktar || !Number(miktar) || (miktar < 0 || miktar > 100)) return message.reply({content:"Lütfen **1-100** arasında bir değer girerek tekrar deneyiniz"})
const log = await message.guild.channels.cache.find(x=> x.name == "audit-log");
await message.channel.bulkDelete(miktar).then(async x=>{
   message.channel.send({content:`${message.channel} kanalından toplam ${miktar} adet mesaj silindi.`}).then(y=> setTimeout(() => {if(y) y.delete();},5000 ))
  if(log) await log.send({content:`\`${message.member.user.tag}\` tarafından ${message.channel} kanalından <t:${(Date.now()/1000).toFixed()}:R> **${miktar}** adet mesaj silindi!`})
  }).catch(err=>message.reply({content:`**Mesajlar silinemedi!\n \`${err}\`**`}))
} else return cevap(message,"komutKullanamazsın")
}
}
module.exports = Sil;