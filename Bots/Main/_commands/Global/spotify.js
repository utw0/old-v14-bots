
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const afksystem = require("../../../../Global/Database/SystemDB/afk")
const canvacord = require("canvacord")
class Spotify extends Command {
    constructor(client) {
        super(client, {
            name: "spotify",
            description: "Otomatik Yetki atlama sistemini kurar",
            usage: ".afk",
            category: "Global",
            aliases: ["spotify","spo"],

            enabled: true,
 
            });
    }
async onRequest (client, message, args,embed) {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let Activity = member.presence.activities;
    var SpotifyActivity;
    Activity.forEach(Activity => {
      if (Activity.name == "Spotify" && Activity.type == 2) SpotifyActivity = Activity;
    });

    if (member.presence.activities.length === 0 || !SpotifyActivity) {
      return message.channel.send({
        embeds: [embed
        .setDescription(`Bu Kullanıcı Şu Anda **Spotify** Üzerinden Şarkı Dinlemiyor!`)
        ]
      });
    }

    member.presence.activities.forEach(activity => {
      if (activity.type === 2 && activity.name === "Spotify") {

        let image = `https://i.scdn.co/image/${activity.assets.largeImage.slice(
          8
        )}`;
       const card = new canvacord.Spotify()
          .setAuthor(activity.state)
          .setAlbum(activity.assets.largeText)
          .setStartTimestamp(activity.timestamps.start)
          .setEndTimestamp(activity.timestamps.end)
          .setImage(image)
          .setBackground("COLOR", "#06050c")
          .setTitle(activity.details);
        card.build().then(Card => {
          const file = new Discord.AttachmentBuilder(Card, { name: "SpotifyCard.png" });
          return message.channel.send({ embeds: [embed.setImage('attachment://SpotifyCard.png')], files: [file],components:[new ActionRowBuilder({components:[new ButtonBuilder({style:ButtonStyle.Link,label:"Şarkıya git!",url:`https://open.spotify.com/track/${activity.syncId}`})]})] });
        });
      }
    });
  
}
}
module.exports = Spotify;