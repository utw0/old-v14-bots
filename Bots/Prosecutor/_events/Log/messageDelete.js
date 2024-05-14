const { Collection, EmbedBuilder, PermissionsBitField,Formatters } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const cooldown = new Collection();
const ms = require('ms');
const snipe = require("../../../../Global/Database/snipe")


class messageDelete extends Event {
    constructor(client) {
        super(client, {
            name: "messageDelete",
            enabled: true,
        });
    }
    
 async onLoad(message) {
if(message.member.user.bot) return;
const log = await message.guild.channels.cache.find(x=> x.name == "message_log")
if(log) await log.send({embeds:[new EmbedBuilder().setAuthor({name:message.member.user.tag,iconURL:message.member.user.avatarURL({dynamic:true})}).setDescription(`${message.member} tarafından <t:${(Date.now()/1000).toFixed()}:R> ${message.channel} kanalından bir mesaj silindi!`).addFields({name:"Mesaj İçeriği:",value:`${Formatters.codeBlock("fix",message)}`})]})
    }
}

module.exports = messageDelete
