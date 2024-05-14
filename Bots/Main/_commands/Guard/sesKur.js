
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Users")
const VoiceChannels = require("../../../../Global/Database/Backup/Guild.Voice.Channels");

class sesKur extends Command {
    constructor(client) {
        super(client, {
            name: "sesKur",
            description: "Silinen ses kanallarını kurmak için.",
            usage: ".seskur @Kanal/ID",
            category: "Guard",
            aliases: ["sesKur","sk","seskur"],

            enabled: true,
            guildOwner:true,
            developer : true
        });
    }
 async onRequest (client, message, args,embed) {
  if (!args[0] || isNaN(args[0])) return cevap(message,"kanalIDYok")
  VoiceChannels.findOne({ channelID: args[0] }, async (err, data) => {
    if (!data) return cevap(message,"veriYok")
    const newChannel = await message.guild.channels.create( {
      name:data.name,
      type: 2,
      bitrate: data.bitrate,
      parentID: data.parentID,
      position: data.position + 1,
    });
    await newChannel.setParent(data.parentID).catch(x=> undefined)
  let comp = await message.channel.send({ embeds: [embed.setDescription(`**${newChannel.name}** isimli kanal yedeği kuruluyor...`)] })
    const newOverwrite = [];
    for (let index = 0; index < data.overwrites.length; index++) {
      const veri = data.overwrites[index];
      newOverwrite.push({
        id: veri.id,
        allow: new PermissionsBitField(veri.allow).toArray(),
        deny: new PermissionsBitField(veri.deny).toArray()
      });
    }
    await newChannel.permissionOverwrites.set(newOverwrite);
    data.channelID = newChannel.id
    data.save()
    comp.edit({embeds:[embed.setDescription(`**${newChannel.name}** Kanalı kuruldu ve ayarları yapıldı!`)]})

  });
}
}
module.exports = sesKur;