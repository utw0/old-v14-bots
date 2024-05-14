
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Users")
class Kayıtbilgi extends Command {
    constructor(client) {
        super(client, {
            name: "kayıtbilgi",
            description: "Kişinin kayıt geçmişini gösterir.",
            usage: ".kayıtbilgi (@Approval/ID)",
            category: "Register",
            aliases: ["reginfo","kayıtbilgi","kayıt-bilgi"],
            enabled: true,     
        });
    }
    

    onLoad(client) {
    
    }

 async onRequest (client, message, args,embed) {
    if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [...roles.kurucuPerms,...roles.üstYönetimPerms,...roles.ortaYönetimPerms,...roles.altYönetimPerms].some(x=> message.member.roles.cache.has(x))){
   

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
    const data = await User.findOne({ userID: member.id }) || [];
    const kayıtlar = embed.setDescription(`${member} toplam **${data.TeyitNo ? data.TeyitNo : 0}** kayıt yapmış! (**${data.Teyitler ? data.Teyitler.filter(v => v.Gender === "Erkek").length : 0}** erkek, **${data.Teyitler ? data.Teyitler.filter(v => v.Gender === "Kadın").length : 0}** kadın)`);
    return message.channel.send({ embeds: [kayıtlar] })
} else return cevap(message,"komutKullanamazsın")
}
}
module.exports = Kayıtbilgi;