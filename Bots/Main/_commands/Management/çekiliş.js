const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const cekilis = require("../../../../Global/Database/Giveways")
const ms = require("ms")
class Giveways extends Command {
    constructor(client) {
        super(client, {
            name: "çekiliş",
            description: "Sunucuda çekiliş başlatır",
            usage: ".çekiliş",
            category: "Approval",
            aliases: ["çekiliş","Çekiliş","giveway","luhuxparaver"],

            enabled: true,
  
            });
    }
 async onRequest (client, message, args,embed) {
    if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [...roles.kurucuPerms,...roles.üstYönetimPerms].some(x=> message.member.roles.cache.has(x))){
        let zaman = args[0]
        let kazanan = args[1]
        let odul = args.slice(2).join(" ");
        let arr = [];
        if (!zaman) return cevap(message,"çekilişsüre")
        if (!kazanan) return cevap(message,"çekilişsüre")
        if (isNaN(kazanan)) return cevap(message,"çekilişsüre")
        if (kazanan > 1) return cevap(message,"sadece1")
        if (!odul) return cevap(message,"çekilişsüre")
        let sure = ms(zaman)
        let kalan = Date.now() + sure
        if (message) message.delete();
        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder().setCustomId("katil").setLabel("0").setEmoji("🎉").setStyle(ButtonStyle.Primary)
        )
        const row2 = new ActionRowBuilder().addComponents(
          new ButtonBuilder().setCustomId("bitti").setLabel("Çekiliş Bitti").setStyle(ButtonStyle.Danger).setDisabled(true)
        )
        let msg = await message.channel.send({
        
          embeds: [embed.setTitle(`${odul}`).setFooter({text:`Kazanacak kişi sayısı: ${kazanan}`}).setDescription(`
    Çekiliş başladı! Aşağıdaki butona basarak katılabilirsiniz!
    Çekilişi Başlatan : ${message.author}
    Bitiş Zamanı : <t:${Math.floor(kalan / 1000)}:R>
            `)], components: [row],content:"🎉 **ÇEKİLİŞ** 🎉"
        })
    
        setTimeout(() => {
          if (arr.length <= 1) {
            if (msg) msg.edit({
              embeds: [new EmbedBuilder().setTitle(`${odul}`).setDescription(`
    Çekilişe katılım olmadığından çekiliş iptal edildi!
    `)], components: []
            })
            return;
          }
          let random = arr[Math.floor(Math.random() * arr.length)]
          message.channel.send({ content: `<@${random}> Tebrikler **${odul}** kazandınnn! 🎉🎉🎉` })
          if (msg) msg.edit({   
            embeds: [new EmbedBuilder().setTitle(`${odul}`).setFooter({text:`${arr.length} katılımcı!`}).setDescription(`
    Çekiliş sonuçlandı! 
    Çekilişi Başlatan : ${message.author} 
    Kazanan : <@${random}>
                        `)], components: [row2],content:"🎉 **ÇEKİLİŞ SONRA ERDİ** 🎉"
          })
        }, sure)
    
        let collector = await msg.createMessageComponentCollector({})
        collector.on("collect", async (button) => {
          button.deferUpdate(true)
          if (button.customId == "katil") {
            let tikdata = await cekilis.findOne({ messageID: button.message.id })
            if (tikdata?.katilan.includes(button.member.id)) return;
            await cekilis.findOneAndUpdate({ messageID: button.message.id }, { $push: { katilan: button.member.id } }, { upsert: true })
            arr.push(button.member.id)
            const row = new ActionRowBuilder().addComponents(
              new ButtonBuilder().setCustomId("katil").setLabel(`${tikdata?.katilan.length + 1 || 1}`).setEmoji("🎉").setStyle(ButtonStyle.Primary)
            )
            if (msg) msg.edit({
              components: [row]
              ,embeds: [new EmbedBuilder().setColor("Random").setTitle(`${odul}`).setFooter({text:`Kazanacak kişi sayısı: ${kazanan}`}).setDescription(`
    Çekiliş başladı! Aşağıdaki butona basarak katılabilirsiniz!
    Çekilişi Başlatan : ${message.author}
    Katılan kişi sayısı : ${tikdata?.katilan.length + 1 || 1}
    Bitiş Zamanı : <t:${Math.floor(kalan / 1000)}:R>
                                `)]
            })
          }
        })

    } else return cevap(message,"komutKullanamazsın")
}
}
module.exports = Giveways;