const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const tagsistem = require("../../../../Global/Database/SystemDB/guildTag")

class UrlS extends Command {
    constructor(client) {
        super(client, {
            name: "Url",
            description: "Sunucudaki kullanıcılar hakkında bilgi verir.",
            usage: ".Url",
            category: "Approval",
            aliases: ["Url","url"],

            enabled: true,
  
            });
    }
 async onRequest (client, message, args,embed) {
    if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [...roles.kurucuPerms,...roles.üstYönetimPerms,roles.banStaffRole].some(x=> message.member.roles.cache.has(x))){
        message.guild.fetchVanityData().then(res => {
    let Embedcik = new EmbedBuilder().setColor("Random").setAuthor({name:message.guild.name, iconURL: message.guild.iconURL({dynamic:true})})
    .setDescription(`Sunucu özel daveti: **${res.code}** Kullanımı : **${res.uses}**`)
        message.reply({embeds:[Embedcik] }) })      
    

    } else return cevap(message,"komutKullanamazsın")
}
}
module.exports = UrlS;

