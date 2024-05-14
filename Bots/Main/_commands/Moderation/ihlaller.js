
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,TextInputStyle, SelectMenuBuilder,TextInputBuilder , Formatters} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const {Guild} = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Users")
const cezapuan = require("../../../../Global/Database/penaltyDB/cezapuan")
const penalty =require("../../../../Global/Database/penaltyDB/penaltys")
const bans = require("../../../../Global/Database/penaltyDB/ban")
const ms = require("ms");
class İhlaller extends Command {
    constructor(client) {
        super(client, {
            name: "ihlaller",
            description: "ID'si girilen ceza bilgilerini gösterir.",
            usage: ".ihlal (@Approval/ID)",
            category: "Moderasyon",
            aliases: ["ihlaller","ihlal"],
            enabled: true,
        });
    }
async onRequest (client, message, args,embed) {
if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [...roles.kurucuPerms,...roles.üstYönetimPerms,...roles.ortaYönetimPerms,...roles.altYönetimPerms].some(x=> message.member.roles.cache.has(x))){
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        if(!member) return message.reply({content:"İhlal geçmişine bakmak istediğiniz kullanıcının ID'sini veya Etiketini (**@Luppux**) Girmeniz lazım."});
    let data = await penalty.find({guildID:message.guild.id,userID:member.id})
    let cezapuandata = await cezapuan.findOne({guildID:message.guild.id,userID:member.id})
    const cp = cezapuandata ? cezapuandata.cezapuan: 0;
    var ban = 0;
    var cmute = 0;
    var vmute =0;
    var jail = 0;
    for (let i = 0; i < data.length; i++) {
        const cezalar = data[i];
        if(cezalar.penaltys[0].type == "CHAT-MUTE"){cmute++}
        else if(cezalar.penaltys[0].type == "VOICE-MUTE"){vmute++}
        else if(cezalar.penaltys[0].type == "JAIL"){jail++}
        else if(cezalar.penaltys[0].type == "BAN"){ban++}
    }
    message.reply({content:`**${member.user.tag}** Kullanıcısının Toplamda \`${ban+cmute+vmute+jail}\` (**Mute: ${cmute} | VMute: ${vmute} | Jail: ${jail} | Ban: ${ban}**) adet ihlali ve \`${cp}\` ceza puanı bulundu.`})
} else return cevap(message,"komutKullanamazsın")
}
}
module.exports = İhlaller;