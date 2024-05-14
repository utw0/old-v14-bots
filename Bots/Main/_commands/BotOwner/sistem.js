
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,TextInputStyle, SelectMenuBuilder,TextInputBuilder , Formatters, ActionRow} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const guildConfig = require("../../../../Global/Database/Guild.Config")
const guildRoleConfig = require("../../../../Global/Database/Guild.Roles.Config")
const guildChannelConfig = require("../../../../Global/Database/Guild.Channels.Config")
/* System */
const GuildLevelSystem = require("../../../../Global/Database/SystemDB/GuildLevelSystem")
const statSystemDB = require("../../../../Global/Database/SystemDB/guild.stat.system")
const guildTag = require("../../../../Global/Database/SystemDB/guildTag")
const guildBannedTag = require("../../../../Global/Database/SystemDB/guildBannedTag")
const guildInviteSystemDB = require("../../../../Global/Database/SystemDB/guild.invite.system")
const missionsystem = require("../../../../Global/Database/SystemDB/mission.system");
const guildCoinSystem = require("../../../../Global/Database/SystemDB/guild.coin.system");

class Sistem extends Command {
    constructor(client) {
        super(client, {
            name: "sistem",
            description: "Sunucudaki kullanıcılar hakkında bilgi verir.",
            usage: ".sistem",
            category: "Approval",
            aliases: ["system"],
            enabled: true,
            developer : true,
            guildOwner:true   
            });
    }
 async onRequest (client, message, args,embed) {
if(args[0] ==  "durum") {
    let levelsistem = await GuildLevelSystem.findOne({guildID:message.guild.id});
    let level = levelsistem ? levelsistem.levelSystem :false;
    let statsistem = await statSystemDB.findOne({guildID:message.guild.id});
    let stat = statsistem ? statsistem.statSystem :false;
    let tagsistem = await guildTag.findOne({guildID:message.guild.id});
    let tag = tagsistem ? tagsistem.only == true ? `Açık: ${tagsistem.Type}`:"Kapalı" : "Kapalı";
    let yasaklıtagsistem = guildBannedTag.findOne({guildID:message.guild.id});
    let yasaklıtag = yasaklıtagsistem ? yasaklıtagsistem.only : false;
    let invitesistem = await guildInviteSystemDB.findOne({guildID:message.guild.id});
    let invite = invitesistem ? invitesistem.InviteSystem : false;
    let coinsystemdb = await guildCoinSystem.findOne({guildID:message.guild.id});
    let Coin_system = coinsystemdb ? coinsystemdb.coinSystem : false;
    let missionsystemdb = await missionsystem.findOne({guildID:message.guild.id});
    let mission_system = missionsystemdb ? missionsystemdb.only : false;
    let sistemEmoji = "•"
    let tik = message.guild.emojis.cache.find(x=> x.name == "appEmoji_tik") ? message.guild.emojis.cache.find(x=> x.name == "appEmoji_tik") :"✅"
    let carpi = message.guild.emojis.cache.find(x=> x.name == "appEmoji_carpi") ? message.guild.emojis.cache.find(x=> x.name == "appEmoji_carpi") :"❎"
    return message.reply({embeds:[embed.setDescription(`${Formatters.codeBlock("md",`# Sistemlerin durumu aşağıda sıralanmıştır.`)}
**
${sistemEmoji} ${stat == true ? `İstatistik Sistemi: ${tik}`:`İstatistik Sistemi: ${carpi}`}
${sistemEmoji} ${tag == true ? `Tag Sistemi: ${tik}`:`Tag Sistemi: ${carpi}`}
${sistemEmoji} ${yasaklıtag == true ? `Yasaklı Tag Sistemi: ${tik}`:`Yasaklı Tag Sistemi: ${carpi}`}
${sistemEmoji} ${Coin_system == true ? `Ekonomi Sistemi: ${tik}`:`Ekonomi Sistemi: ${carpi}`}
${sistemEmoji} ${invite == true ? `İnvite Sistemi: ${tik}`:`İnvite Sistemi: ${carpi}`}
${sistemEmoji} ${mission_system == true ? `Görev Sistemi: ${tik}`:`Görev Sistemi: ${carpi}`}
**`)]});
}
let menu = new ActionRowBuilder()
.addComponents(
    new SelectMenuBuilder()
    .setCustomId("sistem")
    .setPlaceholder("Menüden uygun sistemi seçiniz.")
    .addOptions(
    [
    {label:"Level Sistemi",description:"Zirve senin olsun?",value:"level"},
    {label:"Ekonomi Sistemi",description:"Sohbet Oyunları ve bahis komutları.",value:"coin"},
    {label:"Yetki Sistemi",description:"Günlük görevler ile en yüksek yetkiye sahip olun.",value:"yetki"},
    {label:"Yasaklı Tag Sistemi",description:"Belirlediğiniz Taglar (Simge/Yazı/Etiket) sunucunuza giremez!",value:"yasaktag"},
    {label:"Ekip Sistemi",description:"Sunucunuzdaki ekipleri otomatik kontrol etsin.",value:"ekip"},
    {label:"Tag Modu",description:"Sunucunuzun tagını belirleyerek taga sahip olanlara özellikler kazanıdırın",value:"tag"},
    {label:"Web Site",description:"Sunucunuza özel bir web site (herkese açık)",value:"web"},
    {label:"İnvite Sistemi",description:"Sunucunuza katılan kullanıcıların kimin davetiyle katıldığını görün!",value:"invite"},
    {label:"İstatistik Sistemi",description:"Sunucunuzda ki Ses/Mesaj istatistiklerini Günlük/Haftalık/Genel olarak anlık görüntüleyin.",value:"stat"},
    ]
    )
)
let msg = await message.channel.send({components:[menu],embeds:[embed.setDescription(`Aşağıda gördüğünüz menüden sunucunuza uygun olucak sistemleri aktif edebilir ve gerekli ayarlarını yapabilirsiniz.`)]})
const filter = d => d.user.id == message.member.id 
const collector = msg.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000 })
collector.on('collect', async (s) => {

    if(s.values[0] == "level"){
        s.reply({content:`Level Sistemi Global Bot'a geçirilmiştir. Geliştirici ile iletişime geçip sunucunuza getirebilirsiniz.`})
    }
    if(s.values[0] == "stat"){
    const guildStat = await statSystemDB.findOne({guildID:s.guild.id});
    let control = guildStat ? guildStat.statSystem : false
    if(!guildStat || control == false) {
        await statSystemDB.findOneAndUpdate({guildID: s.guild.id}, {$set:{statSystem:true}}, {upsert:true});
    s.reply({content:"**İstatistik Sistemi** Aktif Edildi!\nAçılan Komutlar:`.me/stat @uye\n.topstat`", ephemeral:true})
    }else {
        await statSystemDB.findOneAndUpdate({guildID: s.guild.id}, {$set:{statSystem:false}}, {upsert:true});
        s.reply({content:"**İstatistik Sistemi** Kapatıldı!\nKapatılan Komutlar:`.me/stat @uye\n.top`", ephemeral:true})
        }
    }

    if(s.values[0] == "coin"){
        let coinsystemdb = await guildCoinSystem.findOne({guildID:message.guild.id});
        let Coin_system = coinsystemdb ? coinsystemdb.coinSystem : false;
        if(!coinsystemdb || Coin_system == false){
            await guildCoinSystem.findOneAndUpdate({guildID:message.guild.id},{coinSystem:true},{upsert:true})
            s.reply({content:"**Ekonomi Sistemi** Aktif edildi", ephemeral:true})
            
        }else{
            await guildCoinSystem.findOneAndUpdate({guildID:message.guild.id},{coinSystem:true},{upsert:true})
            s.reply({content:"**Ekonomi Sistemi** Kapatıldı!", ephemeral:true})        
}
    }
    if(s.values[0] == "yetki"){
        let missionsystemdb = await missionsystem.findOne({guildID:message.guild.id});
        let mission_system = missionsystemdb ? missionsystemdb.only : false;
        if(!missionsystemdb || mission_system == false){
            await missionsystem.findOneAndUpdate({guildID:message.guild.id},{only:true},{upsert:true})
            s.reply({content:"**Yetki Sistemi** Aktif edildi\nAçılan komutlar:`.yetkiliyap,.tagaldir,.yetkililerim,.taglılarım,.yetkim`", ephemeral:true})
            
        }else{
            await missionsystem.findOneAndUpdate({guildID:message.guild.id},{only:true},{upsert:true})
            s.reply({content:"**Yetki Sistemi** Kapatıldı! \n kapatılan komutlar:`.yetkiliyap,.tagaldir,.yetkililerim,.taglılarım,.yetkim`", ephemeral:true})        
}
    }
    if(s.values[0] == "yasaktag"){
    s.reply({content:"**Yasaklı Modu** \n\nYasaklı taglarınızı belirlemek ve onları sunucunuzdan uzak tutmak için aşağıda ki örnekte verildiği gibi komutları kullanabilirsiniz. ```\n .yasaklıtag ekle isim/etiket \n.yasakıtag liste \n.yasaklıtag çıkar\n```",ephemerl:true})
    }
    if(s.values[0] == "ekip"){}
    if(s.values[0] == "tag"){
        await s.deferUpdate();

     s.channel.send({embeds:[embed.setDescription(`**Tag Modu**nu aktif etmek için aşağıda gösterildiği gibi işlemleri yapınız.`)
.addFields(
    {name:"Public:",value:`Public Taglarını Ayarlamak İçin "**Public**" Butonuna Tıklayınız.\n\`Tıklamadan Önce Tagınızı, Tagsiz Tagını, Taglı Rolünü ve Taglı Log kanalının ID'sini "Kopyalamayı Unutmayın"\``,inline:true},
    {name:"Ekip:",value:`Ekip Taglarını Ayarlamak İçin "**Ekip**" Butonuna Tıklayınız. \n\`Tıklamadan Önce Okuyunuz: Çoklu tag girerken taglar arasında , (virgül) bırakınız aksi takdirte tekrar ayarlamanız gerekebilir. Ve Taglarınızı, Etiket Tagınızı, Taglı Rolünüzü, Taglı Log Kanalının ID'sini kopyalamayı unutmayınız.\``}
    )
],components:[new ActionRowBuilder().addComponents([new ButtonBuilder().setCustomId("public").setLabel("Public").setStyle(ButtonStyle.Secondary),new ButtonBuilder().setCustomId("ekip").setLabel("ekip").setStyle(ButtonStyle.Secondary)])]}).then(async x => {
    const filter = d => d.user.id == message.member.id 
const collector = x.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000 })
collector.on('collect', async (c) => {
if(c.customId == "public"){

    const modal = new ModalBuilder()
    .setCustomId("publicTag")
    .setTitle("Public Tag Sistemi")
    .setComponents(
        new ActionRowBuilder()
        .addComponents(
        new TextInputBuilder()
        .setCustomId("tag")
        .setLabel("Sunucu Tagınız.")
        .setStyle(TextInputStyle.Short)
        .setMaxLength(1)
        ),
        new ActionRowBuilder()
        .addComponents(
        new TextInputBuilder()
        .setCustomId("tagsiz")
        .setLabel("Tagsızların İsimlerinin Başına Gelicek Simge")
        .setStyle(TextInputStyle.Short)
        .setMaxLength(1)
        .setValue("•")
        ),
        new ActionRowBuilder()
        .addComponents(
        new TextInputBuilder()
        .setCustomId("tagrol")
        .setLabel("Taglı Rolü ID")
        .setStyle(TextInputStyle.Short)
        ),
        new ActionRowBuilder()
        .addComponents(
        new TextInputBuilder()
        .setCustomId("taglog")
        .setLabel("Tag Log Kanal İD")
        .setStyle(TextInputStyle.Short)
        ),
    )
  return  await c.showModal(modal,{client:client,interaction:c})
}
if(c.customId = "ekip") {
    const modal = new ModalBuilder()
    .setCustomId("ekipTag")
    .setTitle("Public Tag Sistemi")
    .setComponents(
        new ActionRowBuilder()
        .addComponents(
        new TextInputBuilder()
        .setCustomId("taglar")
        .setLabel("Sunucunuzun Tagları (Taglar arası , koyun)")
        .setStyle(TextInputStyle.Short)
        ),
        new ActionRowBuilder()
        .addComponents(
        new TextInputBuilder()
        .setCustomId("etag")
        .setLabel("etiket tagını girin (0001)")
        .setStyle(TextInputStyle.Short)
        .setMaxLength(4)
        ),
        new ActionRowBuilder()
        .addComponents(
        new TextInputBuilder()
        .setCustomId("taglitagsiz")
        .setLabel("Taglı/Tagsız İsimlerine Gelicek Simge")
        .setStyle(TextInputStyle.Short)
        .setValue("•, •")
        .setMaxLength(4)
        ),
        new ActionRowBuilder()
        .addComponents(
        new TextInputBuilder()
        .setCustomId("tagrol")
        .setLabel("Taglılara verilicek rol ID")
        .setStyle(TextInputStyle.Short)
        ),
        new ActionRowBuilder()
        .addComponents(
        new TextInputBuilder()
        .setCustomId("taglog")
        .setLabel("Tag log kanal ID")
        .setStyle(TextInputStyle.Short)
        ),
    )
  return  await c.showModal(modal,{client:client,interaction:c})

}
})
})

    }
    if(s.values[0] == "web"){}
    if(s.values[0] == "invite"){
        const guildInvite = await guildInviteSystemDB.findOne({guildID:message.guild.id});
        const guildInviteControl = guildInvite ? guildInvite.InviteSystem : false;
        if(!guildInvite || guildInviteControl == false) {
            await guildInviteSystemDB.findOneAndUpdate({guildID: s.guild.id}, {$set:{InviteSystem:true}}, {upsert:true});
        s.reply({content:"**Invite Sistemi** Aktif Edildi!\nAçılan Komutlar:`.davetim, .topdavet, .invite ekle/çıkar/bonus`", ephemeral:true})
        }else {
            await guildInviteSystemDB.findOneAndUpdate({guildID: s.guild.id}, {$set:{InviteSystem:false}}, {upsert:true});
            s.reply({content:"**İstatistik Sistemi** Kapatıldı!\nKapatılan Komutlar:`.davetim, .topdavet, .invite ekle/çıkar/bonus`", ephemeral:true})
            } 
    }
})
}
}
module.exports = Sistem;