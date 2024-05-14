const { Client } = require('discord.js');
const { DiscordBanners } = require('discord-banners');
const { Command } = require("../../../../Global/Structures/Default.Commands");
const discordBanners = new DiscordBanners(client);
class Cihaz extends Command {
    constructor(client) {
        super(client, {
            name: "Cihaz",
            description: "Discord'a bağlandığınız cihaz(lar)ı gösterir",
            usage: ".cihaz",
            category: "Global",
            aliases: ["cihazim","cihaz","cihazım"],
            enabled: true,
 
            });
    }
async onRequest (client, message, args,embed) {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if(member.presence && member.presence.clientStatus){
    let web = message.guild.emojis.cache.find(x=> x.name == "appEmoji_web") ? message.guild.emojis.cache.find(x=> x.name == "appEmoji_web") : "";
    let pc =message.guild.emojis.cache.find(x=> x.name == "appEmoji_bilgisayar") ? message.guild.emojis.cache.find(x=> x.name == "appEmoji_bilgisayar") : "";
    let tel =message.guild.emojis.cache.find(x=> x.name == "appEmoji_telefon") ? message.guild.emojis.cache.find(x=> x.name == "appEmoji_telefon") : "";
    let a = Object.keys(member.presence.clientStatus); 
    let b = a.map(x=>x.replace("web", `**${web} \`Internet Tarayıcısı\`**`).replace("desktop",`**${pc} \`Masa Üstü Uygulaması (PC)\`**`).replace("mobile",`**${tel} \`Telefon\`**`));
    if(message) await message.react(await emojiBul("appEmoji_tik"))
    if(message.member.id == member.id){
    message.reply({embeds:[embed.setDescription(`Bağlandığın cihazlar aşağıda verilmiştir.`).addFields({name:"Cihazlar ("+a.length+")",value:`${b.join("\n")}`})]})
    }else {
    message.channel.send({embeds:[embed.setDescription(`${member} kullanıcısının bağlandığı cihazlar aşağıda verilmiştir.`).addFields({name:"Cihazlar ("+a.length+")",value:`${b.join("\n")}`})]})
    }} else {message.reply({content:`${member.id == message.member.id ? `bağlandığın cihazları bulamıyorum`:`**${member.user.tag}** kullanıcısının bağlandığı cihazları bulamıyorum :(`}`})}

};
}

module.exports = Cihaz;
