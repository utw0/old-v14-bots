const { Collection, EmbedBuilder, PermissionsBitField } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const cooldown = new Collection();
const ms = require('ms');
const snipe = require("../../../../Global/Database/snipe")


class snipeEvent extends Event {
    constructor(client) {
        super(client, {
            name: "messageDelete",
            enabled: true,
        });
    }
    
 async onLoad(message) {
if(message.member.user.bot) return;
if(message.attachments.size > 0) {
let link = await message.attachments.map(x=> x)[0].url;
console.log(link)
await snipe.findOneAndUpdate({guildID:message.guild.id},{$set:{
    userID:message.author.id,
    deletedMessage:message.content,
    deletedMessageDate:Date.now(),
    deletedMessageAttachement:link
}},{upsert:true})
} else {
    await snipe.findOneAndUpdate({guildID:message.guild.id},{$set:{userID:message.author.id,deletedMessage:message.content,deletedMessageDate:Date.now(),deletedMessageAttachement:null}},{upsert:true})

}

    }
}

module.exports = snipeEvent
