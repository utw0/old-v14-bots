const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,AttachmentBuilder  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const Coin = require("../../../../Global/Database/SystemDB/coin.js")
const coinSystem = require("../../../../Global/Database/SystemDB/guild.coin.system");
const Canvas = require("canvas");

class coin2 extends Command {
    constructor(client) {
        super(client, {
            name: "test31",
            description: "hm",
            usage: ".test31 (@Approval/ID)",
            category: "Economy",
            aliases: ["test31","test31"],
            enabled: true,
        });
    }
 async onRequest (client, message, args,embed) {
const coinsystemData = await coinSystem.findOne({guildID:message.guild.id});
const coinSystemOnly = coinsystemData ? coinsystemData.coinSystem : false;
if(coinSystemOnly == true){
    if(message) await message.react(await emojiBul("appEmoji_tik"))
    const member = message.member
    const coin = message.guild.emojis.cache.find(x=> x.name == "appEmoji_coin");
    const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('ödül')
        .setLabel("🎁")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('ödül2ödül')
        .setLabel("🎁")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('ödül2')
        .setLabel("🎁")
        .setStyle(ButtonStyle.Primary),
    );
    var data = await Coin.findOne({guildID:message.guild.id,userID:member.id})
    if(!data) await Coin.findOneAndUpdate({guildID:message.guild.id,userID:member.id},{$set:{coin:100,beklemeSuresi:Date.now(),gameSize:0,profilOlusturma:Date.now(),hakkimda:"Girilmedi",evlilik:false,evlendigi:undefined,dailyCoinDate:(Date.now() - 86400000)}},{upsert:true})
    data = await Coin.findOne({guildID:message.guild.id,userID:member.id})
    let canvas = Canvas.createCanvas(300, 300),
    ctx = canvas.getContext("2d");
    let background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1066294819594453012/1077949669998604298/kediluppux.png");
    ctx.drawImage(background, 0, 0, 300, 300);
    const img = new AttachmentBuilder(canvas.toBuffer(), 'oy.png');
    message.reply({files: [img],components:[row]})
}else return cevap(message,"sistemKapali");
}
}
module.exports = coin2;