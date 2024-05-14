
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");

class Emoji extends Command {
    constructor(client) {
        super(client, {
            name: "emoji",
            description: "manuel kod denemeleri için",
            usage: ".emojiekle",
            category: "Approval",
            aliases: ["emekle","emoji","emojiekle"],

            enabled: true,

            developer:true
        });
    }
    

    onLoad(client) {
    
    }

   async onRequest (client, msg, args,embed) {
  if(args[0] == "kur"){
const emojiler = 
[
 {name:"appEmoji_bir",link:"https://cdn.discordapp.com/emojis/994628089592156220.webp?size=96&quality=lossless"},
 {name:"appEmoji_iki",link:"https://cdn.discordapp.com/emojis/994628094172332062.webp?size=96&quality=lossless"},
 {name:"appEmoji_uc",link:"https://cdn.discordapp.com/emojis/994628099738189894.webp?size=96&quality=lossless"},
 {name:"appEmoji_dort",link:"https://cdn.discordapp.com/emojis/994628103496286228.webp?size=96&quality=lossless"},
 {name:"appEmoji_bes",link:"https://cdn.discordapp.com/emojis/994628107443122246.webp?size=96&quality=lossless"},
 {name:"appEmoji_alti",link:"https://cdn.discordapp.com/emojis/994628111771652248.webp?size=96&quality=lossless"},
 {name:"appEmoji_yedi",link:"https://cdn.discordapp.com/emojis/994628116603469844.webp?size=96&quality=lossless"},
 {name:"appEmoji_sekiz",link:"https://cdn.discordapp.com/emojis/994628120789393458.webp?size=96&quality=lossless"},
 {name:"appEmoji_dokuz",link:"https://cdn.discordapp.com/emojis/994628124782379088.webp?size=96&quality=lossless"},
 {name:"appEmoji_sifir",link:"https://cdn.discordapp.com/emojis/994628084709994536.webp?size=96&quality=lossless"},
 {name:"appEmoji_cop",link:"https://cdn.discordapp.com/emojis/994706622536503367.webp?size=96&quality=lossless"},
 {name:"appEmoji_cark",link:"https://cdn.discordapp.com/emojis/995772653166137444.webp?size=96&quality=lossless"},
 {name:"appEmoji_bot",link:"https://cdn.discordapp.com/emojis/994706632225337427.webp?size=96&quality=lossless"},
 {name:"appEmoji_saat",link:"https://cdn.discordapp.com/emojis/995063032134770808.webp?size=96&quality=lossless"},
 {name:"appEmoji_solOk",link:"https://cdn.discordapp.com/emojis/995056594805076029.webp?size=96&quality=lossless"},
 {name:"appEmoji_sagOk",link:"https://cdn.discordapp.com/emojis/995056603025916034.webp?size=96&quality=lossless"},
 {name:"appEmoji_tik",link:"https://cdn.discordapp.com/emojis/992914567334211655.webp?size=96&quality=lossless"},
 {name:"appEmoji_carpi",link:"https://cdn.discordapp.com/emojis/992914543724466268.webp?size=96&quality=lossless"},
 {name:"appEmoji_ses",link:"https://cdn.discordapp.com/emojis/1059113666122878976.webp?size=96&quality=lossless"},
 {name:"appEmoji_metin",link:"https://cdn.discordapp.com/emojis/994706608162615416.webp?size=96&quality=lossless"},
 {name:"appEmoji_kamera",link:"https://cdn.discordapp.com/emojis/992914542029963315.webp?size=96&quality=lossless"},
 {name:"appEmoji_yayin",link:"https://cdn.discordapp.com/emojis/994626651277246484.webp?size=96&quality=lossless"},
 {name:"appEmoji_oynat",link:"https://cdn.discordapp.com/emojis/993985938277539991.webp?size=96&quality=lossless"},
 {name:"appEmoji_elmas",link:"https://cdn.discordapp.com/emojis/995772655766622259.webp?size=96&quality=lossless"},
 {name:"appEmoji_kategori",link:"https://cdn.discordapp.com/emojis/992914549118337167.webp?size=96&quality=lossless"},
 {name:"appEmoji_davet",link:"https://cdn.discordapp.com/emojis/1061356516403318845.webp?size=96&quality=lossless"},
 {name:"appEmoji_coin",link:"https://cdn.discordapp.com/emojis/1061357707023626240.webp?size=96&quality=lossless"},
 {name:"appEmoji_yukarcizgi",link:"https://cdn.discordapp.com/emojis/1062288419016933446.webp?size=44&quality=lossless"},
 {name:"appEmoji_boskutu",link:"https://cdn.discordapp.com/emojis/1062288417003671673.webp?size=44&quality=lossless"},
 {name:"appEmoji_kalp",link:"https://cdn.discordapp.com/emojis/1062291976239714376.webp?size=44&quality=lossless"},
 {name:"appEmoji_kiraz",link:"https://cdn.discordapp.com/emojis/1062291978378813460.webp?size=44&quality=lossless"},
 {name:"appEmoji_patlican",link:"https://cdn.discordapp.com/emojis/1062291981893648424.webp?size=44&quality=lossless"},
 {name:"appEmoji_slot",link:"https://cdn.discordapp.com/emojis/1062288778053570660.gif?size=96&quality=lossless"},
 {name:"appEmoji_web",link:"https://cdn.discordapp.com/emojis/1062691786369286144.webp?size=96&quality=lossless"},
 {name:"appEmoji_bilgisayar",link:"https://cdn.discordapp.com/emojis/1062691585927696434.webp?size=96&quality=lossless"},
 {name:"appEmoji_telefon",link:"https://cdn.discordapp.com/emojis/1062691582807113769.webp?size=96&quality=lossless"},
 {name:"appEmoji_level",link:"https://cdn.discordapp.com/emojis/1063762712078864474.webp?size=96&quality=lossless"},
 {name:"appEmoji_kup",link:"https://cdn.discordapp.com/emojis/1062774380708503572.webp?size=96&quality=lossless"},
 {name:"appEmoji_unlem",link:"https://cdn.discordapp.com/emojis/993229107968094298.webp?size=96&quality=lossless"},
 {name:"appEmoji_guard",link:"https://cdn.discordapp.com/emojis/1064986417115172995.webp?size=96&quality=lossless"},
 {name:"nokta2",link:"https://cdn.discordapp.com/emojis/1068524729578823710.webp?size=96&quality=lossless"}
]
/* {name:"",link:""},
 */
for (let i = 0; i < emojiler.length; i++) {
  const emojix = emojiler[i];
  const e = msg.guild.emojis.cache.find(x=> x.name == emojix.name);
  if(e) { console.log(`${e.name} isimli emoji sunucuda bulunduğundan tekrar oluşturulmadı.`)}
  else {
    msg.guild.emojis.create({attachment:emojix.link,name: emojix.name})
    .then(emoji => msg.channel.send({embeds: [new EmbedBuilder().setDescription(`Başarıyla \`${emoji.name}\` adında emoji oluşturuldu. (${emoji})`)]}))
    }
}
  }else
  {
            const hasEmoteRegex = /<a?:.+:\d+>/gm
    const emoteRegex = /<:.+:(\d+)>/gm
    const animatedEmoteRegex = /<a:.+:(\d+)>/gm
    const isim = `luppux_${Math.round((Math.random()*9999))}`
    const message = msg.content.match(hasEmoteRegex)
    var emoji;
      if (emoji = emoteRegex.exec(message)) return EmojiYükle("https://cdn.discordapp.com/emojis/" + emoji[1] + ".png?v=1", isim, msg)
      else 
      if (emoji = animatedEmoteRegex.exec(message)) return EmojiYükle("https://cdn.discordapp.com/emojis/" + emoji[1] + ".gif?v=1", isim, msg)
      else {
        let [link, ad] = args.slice(0).join(" ").split(" ");
        if (!link) return msg.channel.send(`Lütfen bir bağlantı belirtmelisin! __Örn:__ \`.emojiekle <Bağlantı> <Emoji Ismi>\``).then(x => setTimeout(() => { x.delete() }, 7500));
        if (!ad) return msg.channel.send(`Lütfen bir emoji ismi belirtmelisin! __Örn:__ \`.emojiekle <Bağlantı> <Emoji Ismi>\``).then(x => setTimeout(() => { x.delete() }, 7500));
        EmojiYükle(link, ad, msg)
      }
 }
    }
}
function EmojiYükle(link, ad, message) {
  message.guild.emojis.create({attachment:link,name: ad})
  .then(emoji => message.channel.send({embeds: [new EmbedBuilder().setDescription(`Başarıyla \`${emoji.name}\` adında emoji oluşturuldu. (${emoji})`)]}).then(x => {
    message.react("✔")  
    setTimeout(() => {
          x.delete()

      }, 7500);
  }))
}
module.exports = Emoji;
