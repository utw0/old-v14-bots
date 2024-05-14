
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const kayıtlar = require("../../../../Global/Database/Users")
class Teyitler extends Command {
    constructor(client) {
        super(client, {
            name: "kayıtlar",
            description: "Yapılan kayıtların listesi.",
            usage: ".kayıtlar (@Approval/ID)",
            category: "Register",
            aliases: ["teyitler","kayıtlar"],

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
    var sayi = 1
    var sayfa = 1
    const data = await kayıtlar.findOne({ userID: member.id }) || []
    if (!data) return message.channel.send({ embeds: [embed.setDescription(`${member} Adlı kullanıcıya ait herhangi bir teyit verisi bulunamadı!`)] });
    if (!data.Teyitler) return message.channel.send({ embeds: [embed.setDescription(`${member} Adlı kullanıcıya ait herhangi bir teyit verisi bulunamadı!`)] });
    let teyits = data.Teyitler.filter(e => message.guild.members.cache.get(e.userID))
    teyits.map(e => e ? `${sayi++}-` : "")
    let pages = teyits.chunk(15);
    if (!pages.length || !pages[sayfa - 1].length) return message.channel.send({ embeds: [embed.setDescription(`${member} Adlı kullanıcıya ait herhangi bir teyit verisi bulunamadı!`)] })
    let geri = new ButtonBuilder().setCustomId('geri').setEmoji(await emojiBul("appEmoji_solOk")).setLabel("Önce ki Sayfa").setStyle(ButtonStyle.Secondary);
    let ileri = new ButtonBuilder().setCustomId('ileri').setEmoji(await emojiBul("appEmoji_sagOk")).setLabel("Sonra ki Sayfa").setStyle(ButtonStyle.Secondary)
    let carpi = new ButtonBuilder().setCustomId('cancel').setEmoji(await emojiBul("appEmoji_cop")).setLabel("Sayfaları Kapat").setStyle(ButtonStyle.Secondary)
    if(sayfa == 1){
geri.setDisabled(true);
ileri.setDisabled(true);
}
    let msg = await message.channel.send({ components: [new ActionRowBuilder()
        .addComponents(
            geri,
            carpi,
            ileri
    
        )],embeds: [embed.setDescription(`${member} adlı kullanıcının toplam **${sayi - 1}** teyidi bulundu! \n\n${pages[sayfa - 1].map(e => e ? ` <@!${e.userID}> (<@&${e.rol}>) ${new Date(e.date).toTurkishFormatDate()}` : "").join("\n")}`).setFooter({text:`Sayfa: ${sayfa}`})] })

var filter = (button) => button.user.id === message.author.id;
const collector = msg.createMessageComponentCollector({ filter, time: 30000 })
collector.on('collect', async (button, user) => {
 
    if (button.customId === "ileri") {
            if (sayfa == pages.length) return;
            sayfa++;
            if (msg) msg.edit({ components: [new ActionRowBuilder()
                .addComponents(
                    geri,
                    carpi,
                    ileri
            
                )], embeds: [embed.setDescription(`${pages[sayfa - 1].map(e => e ? `<@!${e.userID}> (<@&${e.rol}>) ${new Date(e.date).toTurkishFormatDate()}` : "").join("\n")}`).setFooter({text:`Sayfa: ${sayfa}`})] });

        } else if (button.customId === "cancel") {

            if (msg) msg.delete().catch(err => { });
            if (message) return message.delete().catch(err => { });

        } else if (button.customId === "geri") {

            if (sayfa == 1) return;
            sayfa--;
            if (msg) msg.edit({ components: [new ActionRowBuilder()
                .addComponents(
                    geri,
                    carpi,
                    ileri
            
                )], embeds: [embed.setDescription(`${pages[sayfa - 1].map(e => e ? `<@!${e.userID}> (<@&${e.rol}>) ${new Date(e.date).toTurkishFormatDate()}` : "").join("\n")}`).setFooter({text:`Sayfa: ${sayfa}`})] });

        }
    });
} else return cevap(message,"komutKullanamazsın")

}
}
module.exports = Teyitler;