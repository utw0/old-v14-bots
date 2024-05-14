const { Collection, EmbedBuilder, PermissionsBitField } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const cooldown = new Collection();
const ms = require('ms');
class voiceChannelSwitch extends Event {
    constructor(client) {
        super(client, {
            name: "voiceChannelSwitch",
            enabled: true,
        });
    }
    
 async onLoad(member, oldChannel, newChannel) {
if(member.user.bot) return;
const log = await oldChannel.guild.channels.cache.find(x=> x.name == "voiceswitch_log")
if(log) await log.send({
    embeds:[
new EmbedBuilder()
.setAuthor({name:member.user.tag,iconURL:member.user.avatarURL({dynamic:true})})
.setDescription(`\`${member.user.tag}\` <t:${(Date.now()/1000).toFixed()}:R> **${oldChannel.name}** isimli ses kanaldan çıkıp **${newChannel.name}** kanalına giriş yaptı!`)
    ]
})

    }
}

module.exports = voiceChannelSwitch
