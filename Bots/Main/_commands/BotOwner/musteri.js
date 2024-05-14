
const { Command } = require("../../../../Global/Structures/Default.Commands");
const musteri = require("../../../../Global/Database/Musteri")

class Müşteri extends Command {
    constructor(client) {
        super(client, {
            name: "musteri",
            description: "Müşteri ekleyip çıkarmak için.",
            usage: ".musteri yap/çıkar",
            category: "Team",
            aliases: ["musteri","müşteri"],
            enabled: true,
            developer: true
        });
    }
async onRequest (client, message, args) {
const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || client.users.cache.get(args[1]);
const guild = client.guilds.cache.get(args[2]);
if(args[0] == "yap"){
const data = await musteri.findOne({guildID:guild.id,userID:member.id})
if(data) return message.reply({content:`**${member.user.tag}** <t:${Math.floor((data.date/1000))}> tarihinden beri müşterimizdir.`})
else {
var şifre =await sifre()
await musteri.findOneAndUpdate({guildID:guild.id,userID:member.id},{$set:{only:true,date:Date.now(),password:şifre}},{upsert:true})
return message.reply({content:`${member}, Müşteri olarak işaretlendi!
\`|\`** Panel erişim şifresi:** ${şifre}
\`-\` **Not:** her 30 saniyede şifre sıfırlanır. \`/sifrem\` yazarak yeni şifreni öğrenebilirsin.`})
}
}
if(args[0] == "çıkar"){
    const data = await musteri.findOne({guildID:guild.id,userID:member.id})
    if(data){
await musteri.findOneAndDelete({guildID:guild.id,userID:member.id},{upsert:true})
  message.reply({content:`**${member.user.tag}** artık müşterimiz değildir.`})}
    else {
        message.reply({content:`**${member.user.tag}** müşterimiz değil ?`})
    }
    }
    }
}
module.exports = Müşteri
