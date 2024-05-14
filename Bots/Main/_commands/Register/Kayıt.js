
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, ActionRow ,StringSelectMenuBuilder } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const tagsistem = require("../../../../Global/Database/SystemDB/guildTag")
const Users = require("../../../../Global/Database/Users")
const taglialimdb = require("../../../../Global/Database/SystemDB/guild.tagli.alim")
const missionsystem = require("../../../../Global/Database/SystemDB/mission.system")
const guildAutoStaffdb = require("../../../../Global/Database/SystemDB/guild.auto.staff")

class Kayıt extends Command {
    constructor(client) {
        super(client, {
            name: "kayıt",
            description: "Sunucuya üyeleri kayıt etmek için kullanılır.",
            usage: ".kayıt @Approval/ID isim yaş",
            category: "Register",
            aliases: ["e","k","erkek","kız","kayıt","kayit"],

            enabled: true,
        });
    }
   async onRequest (client, message, args,embed) {
    if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [...roles.kurucuPerms,...roles.üstYönetimPerms,...roles.ortaYönetimPerms,...roles.altYönetimPerms,roles.registerStaffRole].some(x=> message.member.roles.cache.has(x))){
      const data = await tagsistem.findOne({guildID:message.guild.id});      
      const a = data.only 
      
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    args = args.filter(a => a !== "" && a !== " ").splice(1);
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase() + arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || undefined
    let kayıtRolleri = [...roles.womanRoles,...roles.manRoles]
    if (!member) return cevap(message,"memberYok")
    if (member.roles.cache.has(roles.jailedRole)) return  cevap(message,"cezali")
    if (member.roles.cache.has(roles.suspectRole)) return  cevap(message,"supheli")
    if (member.roles.cache.has(roles.bannedTagRole)) return  cevap(message,"yasakliTag")
    if (kayıtRolleri.some(role => member.roles.cache.has(role))) return  cevap(message,"kayitli")
    if (member.user.bot) return cevap(message,"bot")
    if (!member.manageable) return  cevap(message,"yetersizYetki")
    if (!isim) return  cevap(message,"isimYok")    
    if(message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !yaş) return  cevap(message,"yasYok")
    if (member.roles.highest.position >= message.member.roles.highest.position && !client.owners.includes(message.author.id)) return  cevap(message,"üstaynıYetki")
    let taglialimdata = await taglialimdb.findOne({guildID:message.guild.id});
    let taglialimonly = taglialimdata ? taglialimdata.only:false;
    if((a == true && data.Type == "Public") && (taglialimonly == true && (!member.user.username.includes(data.Tag) && ![roles.boosterRole,roles.vipRole].some(x=> member.roles.cache.has(x))))) return message.reply({content:`Kayıt işlemini tamamlamak için ${member} kullanıcısının tagımızı (\`${data.Tag}\`) almalı, Sunucuya takviye yapmalı veya __Üst Yönetim__ tarafından **VIP** olarak kaydedilmelidir.`})
    const tag = `${a == true ? `${data.Type == "Public" ? `${member.user.username.includes(data.Tag) ? `${data.Tag}`:`${data.unTag}`}` :`${data.nameTags.some(x=> member.user.username.includes(x) || member.user.discriminator == data.NumberTag) ? `${data.Tag}`:`${data.unTag}`}`}` : ""}`
    const isimlerData = await Users.findOne({guildID: message.guild.id, userID: member.id});
var isimlerMenuİcerik = [{label:"İsimler",description:"Kullanıcının Geçmiş İsimleri",value:"isimler"}];
if(isimlerData) {
  let length = 0
isimlerData.Names.reverse().slice(0, 25).forEach(async namesData => {
isimlerMenuİcerik.push({label:`${namesData.Name}`,description:`${tarihsel(namesData.date)} - ${namesData.rol}`,value:`${length}`});
length = length+1;
});
}
const isimlerMenu = await new ActionRowBuilder()
.setComponents(
new StringSelectMenuBuilder()
.setCustomId("namesMenu")
.setOptions(isimlerMenuİcerik)
.setPlaceholder("Kullanıcının Geçmiş İsimleri:")
)
    var setName = `${tag} ${isim} ${yaş == undefined ? "":`| ${yaş}`}`;
    if (setName.length > 32) return  message.reply({content:cevaplar.isimApiSınır})
    const row = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId('Erkek')
        .setLabel("Erkek")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('Kadın')
        .setLabel("Kadın")
        .setStyle(ButtonStyle.Danger),
      new ButtonBuilder()
        .setCustomId('CANCEL')
        .setLabel("İptal")
        .setStyle(ButtonStyle.Secondary),
    );
    const log = message.guild.channels.cache.find(x=> x.name == "kayıt_log")
    const chat = message.guild.channels.cache.get(channels.chatChannel);
    let missionsystemdb = await missionsystem.findOne({guildID:message.guild.id});
    let mission_system = missionsystemdb ? missionsystemdb.only : false;
    var guildAutoStaff = await guildAutoStaffdb.findOne({guildID:message.guild.id,userID:message.member.id})
    const authorityStatus = guildAutoStaff ? guildAutoStaff.authorityStatus : false
const msg = await message.channel.send({ components: [row], embeds: [embed.setDescription(`${member}, Üyesinin ismi **${isim} | ${yaş}** olarak değiştirilicek.\n`)], components: [isimlerMenu,row]});
var filter =async (button) =>{
  await button.deferUpdate()
  return button.user.id === message.author.id};
const collector = msg.createMessageComponentCollector({ filter, time: 30000 });
collector.on('collect', async (button, user) => {
  let tamamlandi = await new ButtonBuilder().setCustomId("tamamlandı.").setDisabled(true).setLabel("Kayıt Tamamlandı").setStyle(ButtonStyle.Secondary).setEmoji(await emojiBul("appEmoji_tik"))
if(member.user.username.includes(data.Tag)) await member.roles.add(data.tagRol)
      if (button.customId == "CANCEL") {
            if (msg) msg.delete().catch(err => { });
            if(message) await message.delete();
          }
      if(button.customId == "Erkek"){
           await msg.edit({ embeds:[embed.setDescription(`${member}, Üyesinin ismi **${isim} | ${yaş}** olarak değiştirildi ve **ERKEK** olarak kayıt edilip ${roles.manRoles.map(x=> `<@&${x}>`).join(", ")} rolleri verildi!`)], components: [new ActionRowBuilder({components:[tamamlandi]})] })
            if(log) await log.send({content:`**${member.user.tag}**, **${message.member.user.tag}** tarafından <t:${(Date.now()/1000).toFixed()}> tarihinde (<t:${(Date.now()/1000).toFixed()}:R>) \`Erkek\` olarak kayıt edildi.`})
            await member.setNickname(setName)
            await member.roles.remove(roles.unregisterRoles)
            await Users.findOneAndUpdate({ userID: message.member.id }, { $inc: { TeyitNo: 1 } }, { upsert: true }).exec();
            await Users.findOneAndUpdate({ userID: message.member.id }, { $push: { Teyitler: { userID: member.id, rol: roles.manRoles[0], date: Date.now(), Gender: "Erkek" } } }, { upsert: true });
            await Users.findOneAndUpdate({ userID: member.id }, { $push: { Names: { userID: message.member.id, Name: `${isim} | ${yaş}`, rol: roles.manRoles[0], islem: "Kayıt" } } }, { upsert: true });
            await Users.findOneAndUpdate({ userID: member.id }, { $set: { Teyitci: { userID: message.member.id, Cinsiyet: roles.manRoles[0], date: Date.now() } } }, { upsert: true });
            setTimeout(async() => {await member.roles.add(roles.manRoles);}, 1000);
            if(chat) await chat.send({content:`${member}, sunucumuza **Erkek** olarak katıldı! onu sevgiyle kucaklıyalım!`}).then(x=>setTimeout(() => {if(x) x.delete()},10000 ))
            if(mission_system == true && authorityStatus == true){
              await missionsystem.findOneAndUpdate({guildID:message.guild.id,userID:message.member.id},{$inc:{registrationTask:1}},{upsert:true})
              await missionsControled(message.member.id,message.guild.id,"Kayıt")
              }
            }
      if(button.customId == "Kadın"){
        await msg.edit({ embeds:[embed.setDescription(`${member}, Üyesinin ismi **${isim} | ${yaş}** olarak değiştirildi ve **KADIN** olarak kayıt edilip ${roles.womanRoles.map(x=> `<@&${x}>`).join(", ")} rolleri verildi.`)], components: [new ActionRowBuilder({components:[tamamlandi]})] })
            if(log) await log.send({content:`**${member.user.tag}**, **${message.member.user.tag}** tarafından <t:${(Date.now()/1000).toFixed()}> tarihinde (<t:${(Date.now()/1000).toFixed()}:R>) \`Kadın\` olarak kayıt edildi.`})
            await member.setNickname(setName)
            await member.roles.remove(roles.unregisterRoles)
            await Users.findOneAndUpdate({ userID: message.member.id }, { $inc: { TeyitNo: 1 } }, { upsert: true }).exec();
            await Users.findOneAndUpdate({ userID: message.member.id }, { $push: { Teyitler: { userID: member.id, rol:roles.womanRoles[0], date: Date.now(), Gender: "Kadın" } } }, { upsert: true });
            await Users.findOneAndUpdate({ userID: member.id }, { $push: { Names: { userID: message.member.id, Name: `${isim} | ${yaş}`, rol: roles.womanRoles[0], islem: "Kayıt" } } }, { upsert: true });
            await Users.findOneAndUpdate({ userID: member.id }, { $set: { Teyitci: { userID: message.member.id, Cinsiyet: roles.womanRoles[0], date: Date.now() } } }, { upsert: true });
            setTimeout(async() => {await member.roles.add(roles.womanRoles);}, 1000);
            if(chat) await chat.send({content:`${member}, sunucumuza **Kız** olarak katıldı! onu sevgiyle kucaklıyalım!`}).then(x=>setTimeout(() => {if(x) x.delete()},10000 ))
            if(message) await message.react(await emojiBul("appEmoji_tik"))
            if(mission_system == true && authorityStatus == true){
              await missionsystem.findOneAndUpdate({guildID:message.guild.id,userID:message.member.id},{$inc:{registrationTask:1}},{upsert:true})
              await missionsControled(message.member.id,message.guild.id,"Kayıt")
              }
          }

})
collector.on("end", async (collected, reason) => {
    if (reason === "time") {
    }
  });
} else return cevap(message,"komutKullanamazsın")
}
}

module.exports = Kayıt
