
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")

const CoinDb = require("../../../../Global/Database/SystemDB/coin")

const coinSystem = require("../../../../Global/Database/SystemDB/guild.coin.system");


class Slot extends Command {
    constructor(client) {
        super(client, {
            name: "slot",
            description: "Slot",
            usage: ".Slot <1-50.000>",
            category: "Global",
            aliases: ["Slot"],
            cooldown:15,
            enabled: true,
 
            });
    }
async onRequest (client, message, args,embed) {
const coinsystemData = await coinSystem.findOne({guildID:message.guild.id});
const coinSystemOnly = coinsystemData ? coinsystemData.coinSystem : false;
if(coinSystemOnly == true){
const slot = [
  message.guild.emojis.cache.find(x=> x.name == "appEmoji_kalp"),
  message.guild.emojis.cache.find(x=> x.name == "appEmoji_kiraz"),
  message.guild.emojis.cache.find(x=> x.name == "appEmoji_patlican")
] 
  
    let betCoin = Number(args[0])
    if(!betCoin || !Number(args[0])) return message.reply({content:`Kaç coin ile oynamak istiyorsun ?`})
    if(betCoin >= 50000) return message.reply({content:"50.000 coinden fazla bir coin ile oyun oynamayazsın"})
  
  
    let slotEmoji = message.guild.emojis.cache.find(x=> x.name == "appEmoji_slot")
    let boskutu = message.guild.emojis.cache.find(x=> x.name == "appEmoji_boskutu")
    let yukaricizgi = message.guild.emojis.cache.find(x=> x.name == "appEmoji_yukarcizgi");
    let mainslot1 = slot[Math.floor(Math.random() * slot.length)];
    let mainslot2 = slot[Math.floor(Math.random() * slot.length)];
    let mainslot3 = slot[Math.floor(Math.random() * slot.length)];
    const coin = message.guild.emojis.cache.find(x=> x.name == "appEmoji_coin");

const messageMemberCoinData = await CoinDb.findOne({guildID:message.guild.id,userID:message.member.id})
if(!messageMemberCoinData) return message.reply({embeds:[embed.setDescription(`${message.member}, **Coin** Profiliniz bulunmamaktadır. \`.coin\` yazarak profilinizi oluşturabilirsiniz.`)]}) 
if(messageMemberCoinData.coin < betCoin) return message.reply({content:`Bu miktarla oynayabilmek için **${betCoin - messageMemberCoinData.coin}\`** daha coine ihtiyacın var.`}) 

let slotMessage = await message.channel.send({content:`
**${yukaricizgi}  SLOTS  ${yukaricizgi}**
${yukaricizgi}${slotEmoji}${slotEmoji}${slotEmoji}${yukaricizgi}
${yukaricizgi}${boskutu}${boskutu}${boskutu}${yukaricizgi}
${yukaricizgi}${boskutu}${boskutu}${boskutu}${yukaricizgi}`})
  
  setTimeout(() => {
  if(mainslot1 === mainslot2 && mainslot1 === mainslot3 ) {
  let carpma = betCoin * 2
  messageMemberCoinData.coin = (messageMemberCoinData.coin + carpma)
  messageMemberCoinData.gameSize = messageMemberCoinData.gameSize +1
  messageMemberCoinData.save();
  slotMessage.edit({content:`
**${yukaricizgi}  SLOTS  ${yukaricizgi}**
${yukaricizgi}${mainslot1}${mainslot2}${mainslot3}${yukaricizgi}
${yukaricizgi}${boskutu}${boskutu}${boskutu}${yukaricizgi}
${yukaricizgi}${boskutu}${boskutu}${boskutu}${yukaricizgi}
**Tebrikler ${message.member.displayName}, ${carpma} Coin ${coin} Kazandın!**`})
  } else {
  messageMemberCoinData.coin = (messageMemberCoinData.coin - betCoin)
  messageMemberCoinData.gameSize = messageMemberCoinData.gameSize +1
  messageMemberCoinData.save();
  slotMessage.edit({content:`
**${yukaricizgi}  SLOTS  ${yukaricizgi}**
${yukaricizgi}${mainslot1}${mainslot2}${mainslot3}${yukaricizgi}
${yukaricizgi}${boskutu}${boskutu}${boskutu}${yukaricizgi}
${yukaricizgi}${boskutu}${boskutu}${boskutu}${yukaricizgi}
**Üzgünüm... \`${message.member.displayName}\`, Kaybettin!**`})
  }
  }, 2500)
  
}else return cevap(message,"sistemKapali");
 
}
}
module.exports = Slot;