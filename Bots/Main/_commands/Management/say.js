
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const tagsistem = require("../../../../Global/Database/SystemDB/guildTag")

class Say extends Command {
    constructor(client) {
        super(client, {
            name: "Say",
            description: "Sunucudaki kullanıcılar hakkında bilgi verir.",
            usage: ".say",
            category: "Approval",
            aliases: ["s","say"],

            enabled: true,
  
            });
    }
 async onRequest (client, message, args,embed) {
    if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [...roles.kurucuPerms,...roles.üstYönetimPerms,roles.banStaffRole].some(x=> message.member.roles.cache.has(x))){
        
    const data = await tagsistem.findOne({guildID:message.guild.id});
    const a = data.only 
let üyeSayısı =await message.guild.memberCount;
let sestekiÜyeSayısı =await message.guild.members.cache.filter(x=> x.voice.channel).size;
let taglı = a == true ? `${data.Type == "Public" ? message.guild.members.cache.filter(x=> x.user.username.includes(data.Tag)).size : `${data.Type == "Ekip" ? `${message.guild.members.cache.filter(member => data.nameTags.some(tag => member.user.username.includes(tag)) || member.user.discriminator == data.NumberTag).size}` : false}`}` : false
message.reply({embeds:[
    new EmbedBuilder()
    .setAuthor({name:message.guild.name, iconURL: message.guild.iconURL({dynamic:true})})
    .setColor("Random")
    .setDescription(`
\`❯\` Sunucuda toplam **${sestekiÜyeSayısı}** kullanıcı ses kanallarında bulunuyor.
\`❯\` Sunucumuz da **${message.guild.memberCount}** üye bulunmakta. (**${message.guild.members.cache.filter(m => m.presence && m.presence.status !== "offline").size}** Aktif)
${taglı == false ? "" : `\`❯\` Sunucuda toplam **${taglı}** taglı kullanıcı bulunuyor.`}
\`❯\` Toplamda **${message.guild.premiumSubscriptionCount}** adet boost basılmış! (**${message.guild.premiumTier}** Seviye).
`)
]})
    } else return cevap(message,"komutKullanamazsın")
}
}
module.exports = Say;