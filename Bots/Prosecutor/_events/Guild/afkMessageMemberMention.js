const { Collection, EmbedBuilder, PermissionsBitField } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const afkdb = require("../../../../Global/Database/SystemDB/afk")
class afk extends Event {
    constructor(client) {
        super(client, {
            name: "messageCreate",
            enabled: true,
        });
    }
    
 async onLoad(message) {
const afksystem = await afkdb.findOne({guildID:message.guild.id,userID:message.member.id});
const only = afksystem ? afksystem.only : false
if(only == true){
message.reply({content:`Hoşgeldin!, <t:${(afksystem.date/1000).toFixed()}:R> **AFK** moduna girmiştin.`}).then(async msg => {setTimeout(async() => {if(msg) await msg.delete();},5000);})
await afkdb.findOneAndDelete({guildID:message.guild.id,userID:message.member.id});
}
    }
}

module.exports = afk
