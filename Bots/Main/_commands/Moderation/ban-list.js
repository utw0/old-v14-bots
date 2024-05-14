
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,TextInputStyle, SelectMenuBuilder,TextInputBuilder , Formatters} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const {Guild} = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Users")
const cezapuan = require("../../../../Global/Database/penaltyDB/cezapuan")
const penalty =require("../../../../Global/Database/penaltyDB/penaltys")
const bans = require("../../../../Global/Database/penaltyDB/ban")
const ms = require("ms");
class BanList extends Command {
    constructor(client) {
        super(client, {
            name: "ban-list",
            description: "Sunucudaki yasaklı kişileri gösterir.",
            usage: ".ban @Approval/ID",
            category: "Moderasyon",
            aliases: ["ban-list","banlist","yasaklılar"],
            enabled: true,
        });
    }
async onRequest (client, message, args,embed) {
if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [...roles.kurucuPerms,...roles.üstYönetimPerms,roles.banStaffRole].some(x=> message.member.roles.cache.has(x))){
var bannedLength = 0;
await  message.guild.bans.fetch().then(async (banned)=> bannedLength = banned.size);
var bannedUsers = [];
await message.guild.bans.fetch().then(async (banned) => {
var i = 0;
    banned.forEach(async (user) => {
        i = i+1
       bannedUsers.push(`${i}. ${user.user.tag} (${user.user.id})`)
   })
})
let mesaj = await chunkify(bannedUsers,20)
message.channel.send({content:`Sunucuda Toplam ${bannedLength} Adet Yasaklama Bulunuyor.`}).then(a=>{
mesaj.forEach(x=>message.channel.send({content:` \`\`\`md
${x.join("\n")}
\`\`\``}))
})
} else return cevap(message,"komutKullanamazsın")
}
}
module.exports = BanList;