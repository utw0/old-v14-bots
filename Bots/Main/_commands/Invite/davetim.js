
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Users")
const {Rank, author} = require("canvacord");
const GuildLevelSystem  = require("../../../../Global/Database/SystemDB/GuildLevelSystem")
const inviter =  require("../../../../Global/Database/invite/inviteSchema")
    const guildInviteSystemDB = require("../../../../Global/Database/SystemDB/guild.invite.system")
class Davetim extends Command {
    constructor(client) {
        super(client, {
            name: "Davetim",
            description: "Davet Bilgilerinizi Gösterir.",
            usage: ".davetim (@Approval/ID)",
            category: "Invite",
            aliases: ["davetim","invite"],

            enabled: true,
        });
    }
 async onRequest (client, message, args,embed) {

    const guildInviteSystem = await guildInviteSystemDB.findOne({guildID:message.guild.id});
    const guildInviteSystemControl = guildInviteSystem ? guildInviteSystem.InviteSystem : false; 
if(guildInviteSystemControl == true) {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    let data = await inviter.findOne({ guildID: message.guild.id, userID: member.id });
if(member.id == message.member.id) {
return await message.reply({embeds:[embed.setDescription(`Toplam **${data.total+data.bonus}** ${member.id === message.author.id ? "davetin" : "daveti"} var. (Gerçek: \`${data.regular || "0"}\`, Bonus: \`${data.bonus || "0"}\`, Sahte: \`${data.fake || "0"}\`, Çıkış: \`${data.leave || "0"}\`)`) .setFooter({text:"Luppux was here !"})]})
}
    message.channel.send({ embeds: [embed.setDescription(`${member} adlı kullanıcının genel davet bilgileri;
    
    Toplam **${data.total+data.bonus}** ${member.id === message.author.id ? "davetin" : "daveti"} var. (Gerçek: \`${data.regular || "0"}\`, Bonus: \`${data.bonus || "0"}\`, Sahte: \`${data.fake || "0"}\`, Çıkış: \`${data.leave || "0"}\`)`)] });
 } else return cevap(message,"sistemKapali");
}
}
module.exports = Davetim;