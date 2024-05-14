
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Users")
const {Rank, author} = require("canvacord");
const snipe =  require("../../../../Global/Database/snipe")
class Snipe extends Command {
    constructor(client) {
        super(client, {
            name: "Snipe",
            description: "Son silinen mesaj hakkında bilgi verir.",
            usage: ".snipe",
            category: "Management",
            aliases: ["snipe"],

            enabled: true,
        });
    }
 async onRequest (client, message, args,embed) {
    
const SnipeData = await snipe.findOne({guildID:message.guild.id})
if(!SnipeData) return message.reply({content:"Son silinen mesaj bulunamadı!"})
let mesaj = SnipeData ? SnipeData.deletedMessage : "Bulunamadı.";
let tarih = SnipeData ? (SnipeData.deletedMessageDate/1000).toFixed() : "Bulunamadı.";
let dosya = SnipeData ? SnipeData.deletedMessageAttachement : null;
let silen = SnipeData ? SnipeData.userID :"Bulunamadı";
if(silen == message.member.id) {
message.reply({embeds:[embed.setDescription(`**<t:${tarih}:R> sildiğin mesaj: ${mesaj}**`)]})
} else {
    message.channel.send({embeds:[embed.setDescription(`<@${silen}>,**<t:${tarih}:R> sildiği mesaj: ${mesaj}** `)]})
}
}
}
module.exports = Snipe;