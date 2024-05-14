const { Collection, EmbedBuilder, PermissionsBitField } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const cooldown = new Collection();
const ms = require('ms');
class voiceChannelLeave extends Event {
    constructor(client) {
        super(client, {
            name: "voiceChannelLeave",
            enabled: true,
        });
    }
    
 async onLoad(member, channel) {
if(member.user.bot) return;
const log = await channel.guild.channels.cache.find(x=> x.name == "voiceleave_log")
if(log) await log.send({
    embeds:[
new EmbedBuilder()
.setAuthor({name:member.user.tag,iconURL:member.user.avatarURL({dynamic:true})})
.setDescription(`\`${member.user.tag}\` <t:${(Date.now()/1000).toFixed()}:R> **${channel.name}** isimli ses kanaldan çıkış yaptı!`)
    ]
})

    }
}

module.exports = voiceChannelLeave
