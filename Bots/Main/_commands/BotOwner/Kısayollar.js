
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,SelectMenuBuilder, ActionRow  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Users")
const GuildLevelSystem  = require("../../../../Global/Database/SystemDB/GuildLevelSystem")
const messageUser = require("../../../../Global/Database/Stats/Message/messageUser")
const messageUserChannel = require("../../../../Global/Database/Stats/Message/messageUserChannel")
const voiceUser = require("../../../../Global/Database/Stats/Voice/voiceUser");
const voiceUserChannel = require("../../../../Global/Database/Stats/Voice/voiceUserChannel")
const userParent = require("../../../../Global/Database/Stats/Voice/voiceUserParent")
const joinedAt = require("../../../../Global/Database/Stats/Voice/voiceJoinedAt")
const statSystemDB = require("../../../../Global/Database/SystemDB/guild.stat.system")
const messageGuild = require("../../../../Global/Database/Stats/Message/messageGuild");
const voiceGuild = require("../../../../Global/Database/Stats/Voice/voiceGuild");
const { DiscordBanners } = require('discord-banners');
const discordBanners = new DiscordBanners(client);
class Kisayollar extends Command {
    constructor(client) {
        super(client, {
            name: "Kısayollar",
            description: "Kısayol menüsünü oluşturur!",
            usage: ".kısayol",
            category: "Approval",
            aliases: ["kısayol","kısayollar"],

            enabled: true,
            guildOwner:true,
            developer : true
        });
    }
    
async onLoad(client) {
client.on("interactionCreate", async (interaction)=>{
const menu =await interaction.values[0];
const member =await interaction.guild.members.cache.get(interaction.user.id);
if(menu == "serverJoin"){
await interaction.reply({content:`**Sunucuya <t:${(member.joinedTimestamp/1000).toFixed()}> tarihinde yani <t:${(member.joinedTimestamp/1000).toFixed()}:R> katılmışsın.**`,ephemeral:true})
}
if(menu == "discordJoin"){
await interaction.reply({content:`**Hesabını <t:${(member.user.createdTimestamp/1000).toFixed()}> tarihinde yani <t:${(member.user.createdTimestamp/1000).toFixed()}:R> oluşturmuşsun.**`,ephemeral:true})
}
if(menu == "levelInfo"){
    const guildlevelsystem = await GuildLevelSystem.findOne({guildID:interaction.guild.id});
    let lvlsystem = guildlevelsystem ? guildlevelsystem.levelSystem : false;
if(lvlsystem == true){
    let authorData = await User.findOne({ guildID: interaction.guild.id, userID: member.id });
    let xp = authorData ? authorData.xp : 1
    let lvl = authorData ? authorData.lvl : 1
    let xpToLvl = authorData ? authorData.xpToLvl : 100   
await interaction.reply({content:`**Mevcut seviyen \`${lvl}\` bir sonra ki seviyeye ulaşmak için \`${xpToLvl-xp}\` __XP__ kazanman gerekiyor.**`,ephemeral:true})
}else return interaction.reply({content:`\`Level Sistemi Kapalı!\``,ephemeral:true})
}
if(menu == "messageStat"){
    const statsystemCollect = await statSystemDB.findOne({guildID:interaction.guild.id});
    let controlsystem = statsystemCollect ? statsystemCollect.statSystem : false;
    if(controlsystem == true) {
    const memberMessageData = await messageUserChannel.find({ guildID: interaction.guild.id, userID: member.id }).sort({ channelData: -1 });
    let messageTop = memberMessageData.length > 0 ? memberMessageData.splice(0, 10).filter(x => interaction.guild.channels.cache.has(x.channelID)).map((x,index) => `\`${index + 1}.\`<#${x.channelID}>: \`${Number(x.channelData).toLocaleString()} mesaj\``).join("\n") : "Veri bulunmuyor."
    const messageData = await messageUser.findOne({ guildID: interaction.guild.id, userID: member.id });
await interaction.reply({content:`**Toplamda ${messageData ? messageData.totalStat : 0} mesajın bulunuyor.

\`•\` __Aylık:__ ${messageData ? messageData.twoWeeklyStat : 0}
\`•\` __Haftalık:__ ${messageData ? messageData.weeklyStat : 0}
\`•\` __Günlük:__ ${messageData ? messageData.dailyStat : 0}

\`➡\` Top 10 Metin Kanalları:
${messageTop}
**`,ephemeral:true})
} else  interaction.reply({content:`\`İstatistik Sistemi Kapalı!\``,ephemeral:true})

}
if(menu == "voiceStat"){
    const statsystemCollect = await statSystemDB.findOne({guildID:interaction.guild.id});
    let controlsystem = statsystemCollect ? statsystemCollect.statSystem : false;
    if(controlsystem == true) {
        const memberVoiceData = await voiceUserChannel.find({ guildID: interaction.guild.id, userID: member.id }).sort({ channelData: -1 });
    
        let voiceTop = memberVoiceData.length > 0 ? memberVoiceData.splice(0, 10).filter(x => interaction.guild.channels.cache.has(x.channelID)).map((x,index) => `\`${index + 1}.\` <#${x.channelID}>: \`${moment.duration(x.channelData).format("H [saat], m [dakika]")}\``).join("\n") : "Veri bulunmuyor."
    
        const voiceData = await voiceUser.findOne({ guildID: interaction.guild.id, userID: member.id });
       let joinedAtData = await joinedAt.findOne({ userID: member.id });
       var a = 0;if(joinedAtData){ a = Date.now() - joinedAtData.date;};
interaction.reply({content:`**Ses kanallarında ${moment.duration(voiceData ? voiceData.totalStat+a : 0).format("H [Saat], m [dakika]")} vakit geçirmişsin!

\`•\` __Aylık:__ ${moment.duration(voiceData ? voiceData.twoWeeklyStat+a : 0).format("H [Saat], m [dakika]")}
\`•\` __Haftalık:__ ${moment.duration(voiceData ? voiceData.weeklyStat+a : 0).format("H [Saat], m [dakika]")}
\`•\` __Günlük:__ ${moment.duration(voiceData ? voiceData.dailyStat+a : 0).format("H [Saat], m [dakika]")}

\`➡\` Top 10 Ses Kanalları:
${voiceTop}
**`,ephemeral:true})
} else  interaction.reply({content:`\`İstatistik Sistemi Kapalı!\``,ephemeral:true})
}
if(menu == "top10Voice"){
    const statsystemCollect = await statSystemDB.findOne({guildID:interaction.guild.id});
    let controlsystem = statsystemCollect ? statsystemCollect.statSystem : false;
    if(controlsystem == true) {
        const messageUsersData = await messageUser.find({ guildID: interaction.guild.id }).sort({ totalStat: -1 });
        const voiceUsersData = await voiceUser.find({ guildID: interaction.guild.id }).sort({ totalStat: -1 });
        const messageGuildData = await messageGuild.findOne({ guildID: interaction.guild.id });
        const voiceGuildData = await voiceGuild.findOne({ guildID: interaction.guild.id });
       const messageUsers = messageUsersData.filter(x=> interaction.guild.members.cache.get(x.userID)).splice(0, 10).map((x, index) => `\`${index + 1}.\` <@${x.userID}>: \`${Number(x.twoWeeklyStat).toLocaleString()} mesaj\``).join(`\n`);
        const voiceUsers = voiceUsersData.filter(x=> interaction.guild.members.cache.get(x.userID)).splice(0, 10).map((x, index) => `\`${index + 1}.\` <@${x.userID}>: \`${moment.duration(x.twoWeeklyStat).format("H [saat], m [dakika]")}\``).join(`\n`);
        const mesaj = `${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`
        const ses = `${voiceUsers.length > 0 ? voiceUsers : "Veri Bulunmuyor."}`
interaction.reply({content:`**Sunucuda ${moment.duration(voiceGuildData ? voiceGuildData.totalStat : 0).format("H [saat], m [dakika]")} ses istatistiği bulunuyor!

\`➡\` __Top 10 Ses İstatistiği:__
${ses}
**`,ephemeral:true})
} else  interaction.reply({content:`\`İstatistik Sistemi Kapalı!\``,ephemeral:true})
}
if(menu == "top10Message"){
    const statsystemCollect = await statSystemDB.findOne({guildID:interaction.guild.id});
    let controlsystem = statsystemCollect ? statsystemCollect.statSystem : false;
    if(controlsystem == true) {
        const messageUsersData = await messageUser.find({ guildID: interaction.guild.id }).sort({ totalStat: -1 });
        const messageGuildData = await messageGuild.findOne({ guildID: interaction.guild.id });
       const messageUsers = messageUsersData.filter(x=> interaction.guild.members.cache.get(x.userID)).splice(0, 10).map((x, index) => `\`${index + 1}.\` <@${x.userID}>: \`${Number(x.twoWeeklyStat).toLocaleString()} mesaj\``).join(`\n`);
        const mesaj = `${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`
interaction.reply({content:`**Sunucuda ${moment.duration(messageGuildData ? messageGuildData.totalStat : 0).format("H [saat], m [dakika]")} mesaj gönderilmiş.

\`➡\` __Top 10 Mesaj İstatistiği:__
${mesaj}
**`,ephemeral:true})
} else  interaction.reply({content:`\`İstatistik Sistemi Kapalı!\``,ephemeral:true})
}
if(menu == "roleInfo"){
let rolsayısı = member.roles.cache.size;
let a =0
let roller = member.roles.cache.sort((a,b)=> b.rawPosition - a.rawPosition).filter(x=> x.id != interaction.guild.id).map((x)=>  `\`${x.rawPosition}.\` ${x}`).join("\n");
let üstrolü = member.roles.highest;
interaction.reply({content:`**Üstünde \`${rolsayısı}\` adet rol bulunuyor.

\`•\` Ayırıcı Rolün: ${üstrolü}
\`➡\` Rollerin:
${roller}**`,ephemeral:true})
}
if(menu == "avatar"){
const avatar = member.user.avatar ? member.user.avatarURL({dynamic:true}) : null
if(avatar == null){
interaction.reply({content:`**Profil resminiz bulunamadı!**`,ephemeral:true})
}
else{
    let link = new ActionRowBuilder({components:[new ButtonBuilder({label:"Tarayıcıda aç", style:ButtonStyle.Link, url:avatar})]})
    await interaction.reply({
      content: `${avatar}`,
      components:[link],
      ephemeral:true
    })}
}
if(menu == "banner"){
    const banner = await discordBanners.getBanner(member.id, { size: 2048, format: "png", dynamic: true })
    if(banner){   
   let link = new ActionRowBuilder({components:[new ButtonBuilder({label:"Tarayıcıda aç", style:ButtonStyle.Link, url: banner})]})
    await interaction.reply({
        content: `${banner}`
        , components:[link],
        ephemeral:true })}
    else if(!banner) return interaction.reply({content:`**Bannerin bulunamadı! :(**`,ephemeral:true})
}
})    
}

 async onRequest (client, message, args,embed) {
const menu = new ActionRowBuilder()
.addComponents(
await new SelectMenuBuilder()
.setCustomId("kisayollar")
.setOptions([
{label:`Sunucuya Katılım`,description:`Sunucuya katılım tarihini öğrenirsin.`,value:`serverJoin`},
{label:`Hesap Oluşturma`,description:`Hesap oluşturma tarihini öğrenirsin.`,value:`discordJoin`},
{label:`Level Bilgi`,description:`Mevcut seviyen hakkında bilgi.`,value:`levelInfo`},
{label:`İstatistik (Mesaj)`,description:`Sunucuda ki mesaj istatistiklerini öğrenirsin.`,value:`messageStat`},
{label:`İstatistik (Ses)`,description:`Sunucuda ki ses istatistiklerini öğrenirsin.`,value:`voiceStat`},
{label:`Top 10 (Ses)`,description:`Sunucuda ki top 10 ses sıralaması.`,value:`top10Voice`},
{label:`Top 10 (Mesaj)`,description:`Sunucuda ki top 10 mesaj sıralaması.`,value:`top10Message`},
{label:`Rollerim`,description:`Üstünde bulunan rollerim tam listesi.`,value:`roleInfo`},
{label:`Avatarım`,description:`Profil resmini alabilirsin`,value:`avatar`},
{label:`Afişim`,description:`Afişin (Bannerın)ı alabilirsin.`,value:`banner`},
])
)
message.channel.send({content:`**Merhaba hey sen, sana diyorum!

Sunucuda komut kullanmadan belirli bilgileri alabilirsin.

Aşağıda bulunan menüden bulunan kısayollardan istediğini seçebilirsin!**

\`Sevgilerle Luppux ❤\``,components:[menu]})

}
}
module.exports = Kisayollar;