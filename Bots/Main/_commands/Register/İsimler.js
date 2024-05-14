
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Users")
class İsimler extends Command {
    constructor(client) {
        super(client, {
            name: "isimler",
            description: "Kişinin geçmiş isimlerini gösterir.",
            usage: ".İsimler @Approval/ID",
            category: "Register",
            aliases: ["names"],
            enabled: true,   
        });
    }

 async onRequest (client, message, args,embed) {
    if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [...roles.kurucuPerms,...roles.üstYönetimPerms,...roles.ortaYönetimPerms,...roles.altYönetimPerms].some(x=> message.member.roles.cache.has(x))){
   

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
    var sayi = 1
    var currentPage = 1
    if (!member) return  message.reply({content:cevaplar.üyeBelirt})
    const data = await  User.findOne({ userID: member.id }) || []
    if (!data) return message.channel.send({ embeds: [embed.setDescription(`Kullanıcıya ait herhangi bir isim verisi bulunamadı!`)] });
    if (!data.Names) return message.channel.send({ embeds: [embed.setDescription(`Kullanıcıya ait herhangi bir isim verisi bulunamadı!`)] });
    let isimler = data.Names
    isimler.map(e => e ? `${sayi++}-` : "")
    let pages = isimler.chunk(5);
    if (!pages.length || !pages[currentPage - 1].length) return message.channel.send({ embeds: [embed.setDescription(`Kullanıcıya ait herhangi bir isim verisi bulunamadı!`)] })
    let geri = new ButtonBuilder().setCustomId('geri').setLabel("◀").setStyle(ButtonStyle.Primary);
    let ileri = new ButtonBuilder().setCustomId('ileri').setLabel("▶").setStyle(ButtonStyle.Primary)
    if(sayi < 5){
geri.setDisabled(true);
ileri.setDisabled(true);
}
    let msg = await message.channel.send({ components: [new ActionRowBuilder()
        .addComponents(
            geri,
          new ButtonBuilder()
            .setCustomId('cancel')
            .setEmoji(`✖`)
            .setStyle(ButtonStyle.Danger),
            ileri
    
        )], embeds: [embed.setDescription(`${member} adlı üyenin toplam **${sayi - 1}** isim verisi bulundu!\n\n${pages[currentPage - 1].map(e => `\`${e.Name}\` ${e.rol ? `(<@&${e.rol}>)` : ""} (${e.islem}) (<@!${e.userID}>)`).join("\n")}`).setFooter({text:`Sayfa: ${currentPage}`})] })
    var filter = (button) => button.user.id === message.author.id;
const collector = msg.createMessageComponentCollector({ filter, time: 30000 })
collector.on('collect', async (button, user) => {
 
        if (button.customId === "ileri") {
            if (currentPage == pages.length) return;
            currentPage++;
            if (msg) msg.edit({ embeds: [embed.setDescription(`${pages[currentPage - 1].map(e => `\`${e.Name}\` ${e.rol ? `(<@&${e.rol}>)` : ""} (${e.islem}) (<@!${e.userID}>)`).join("\n")}`).setThumbnail(member.user.avatarURL({ dynamic: true })).setFooter({text:`Sayfa: ${currentPage}`}).setAuthor({name:message.member.user.tag,iconURL:message.member.user.avatarURL({dynamic:true})})] });

        }
         if (button.customId === "cancel") {

            if (msg) msg.delete().catch(err => { });
            if (message) return message.delete().catch(err => { });

        }
         if (button.customId === "geri") {

            if (currentPage == 1) return;
            currentPage--;
            if (msg) msg.edit({ embeds: [embed.setDescription(`${pages[currentPage - 1].map(e => `\`${e.Name}\` ${e.rol ? `(<@&${e.rol}>)` : ""} (${e.islem}) (<@!${e.userID}>)`).join("\n")}`).setThumbnail(member.user.avatarURL({ dynamic: true })).setFooter({text:`Sayfa: ${currentPage}`}).setAuthor({name:message.member.user.tag,iconURL:message.member.user.avatarURL({dynamic:true})})] });
        }
    }
 );
 collector.on("end", async (collected, reason) => {
    if (reason === "time") {
      if (msg)  msg.delete()
      message.channel.send({ embeds: [embed.setDescription(`${message.author}, 30 saniye boyunca cevap vermediği için  işlem iptal edildi`)] })
    }
  });
} else return cevap(message,"komutKullanamazsın")
}
}
module.exports = İsimler;