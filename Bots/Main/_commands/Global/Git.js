const { Client, EmbedBuilder,  ButtonBuilder, ButtonStyle, ActionRowBuilder, Discord } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
class Git extends Command {
    constructor(client) {
        super(client, {
            name: "Git",
            description: "Aptal Banner Arayanlara banner istedigi kullanicinin bannerin verir :)",
            usage: ".git @Approval/ID",
            category: "Global",
            aliases: ["git","go"],
            enabled: true,
 
            });
    }
async onRequest (client, message, args,embed) {
 const member = await message.mentions.members.first() || await message.guild.members.cache.get(args[0])
 if(!member) return cevap(message,"memberYok");
 if(member.id == message.member.id) return cevap(message,"kendisi");
 if(!message.member.voice) return cevap(message,"kendisiSesteYok");
 if(!member.voice.channel) return cevap(message,"sesteYok");
 const row = new ActionRowBuilder()
 .addComponents(
  new ButtonBuilder().setCustomId("evet").setLabel("Kabul et!").setStyle(ButtonStyle.Success),
  new ButtonBuilder().setCustomId("hayir").setLabel("Reddet!").setStyle(ButtonStyle.Danger),
 )
 if(member.voice){
message.channel.send({
content:`**[${member}]**`,
embeds:[embed.setDescription(`${message.member} senin bulunduğun ses kanalına **(${member.voice.channel})** gelmek istiyor ?`)],
components:[row]
}).then(async msg =>{
  var filter = (button) => button.user.id === member.id;
  const collector = msg.createMessageComponentCollector({ filter, time: 30000*2 })
  collector.on('collect', async (button, user) => {
    if(message) await message.react(await emojiBul("appEmoji_tik"))
    if(button.customId == "evet"){
    if(!message.member.voice || !message.member.voice.channel) return cevap(message,"kendisiSesteYok");
    await message.member.voice.setChannel(member.voice.channel);
    await message.channel.send({content:`${member}, \`${member.voice.channel.name}\` kanalına taşındınız!`})
    await button.reply({embeds:[embed.setDescription(`${message.member} bulunduğunuz ses kanalına (${member.voice.channel}) çekildi!`)],ephemeral:true})
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
    } else if (button.customId == "hayir"){
    await message.channel.send({content:`**[${message.member}]**`,embeds:[embed.setDescription(`${member}, bulunduğu ses kanalına (${member.voice.channel}) gitme isteğinizi reddetti!`)]})
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();

    } 
  })
})
 }
};
}

module.exports = Git;