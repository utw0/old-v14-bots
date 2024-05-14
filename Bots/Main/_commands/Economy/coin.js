const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const Coin = require("../../../../Global/Database/SystemDB/coin.js")
const coinSystem = require("../../../../Global/Database/SystemDB/guild.coin.system");

class coin extends Command {
    constructor(client) {
        super(client, {
            name: "coin",
            description: "hm",
            usage: ".coin (@Approval/ID)",
            category: "Economy",
            aliases: ["coin","param"],
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

    var data = await Coin.findOne({guildID:message.guild.id,userID:member.id})
    if(!data) await Coin.findOneAndUpdate({guildID:message.guild.id,userID:member.id},{$set:{coin:100,beklemeSuresi:Date.now(),gameSize:0,profilOlusturma:Date.now(),hakkimda:"Girilmedi",evlilik:false,evlendigi:undefined,dailyCoinDate:(Date.now() - 86400000)}},{upsert:true})
    data = await Coin.findOne({guildID:message.guild.id,userID:member.id})
    message.reply({content:`**Şuanda __${data.coin}__ ${coin} Coin'in bulunuyor. **`})
} else return cevap(message,"sistemKapali");
}
}
module.exports = coin;