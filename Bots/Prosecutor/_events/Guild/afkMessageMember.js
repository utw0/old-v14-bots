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
if(message.member.user.bot) return;
const member = message.mentions.members.first()
if(!member) return;
const afksystem = await afkdb.findOne({guildID:message.guild.id,userID:member.id});
const only = afksystem ? afksystem.only : false
if(only == true){
message.reply({embeds:[new EmbedBuilder().setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})}).setDescription(`${member}, <t:${(afksystem.date/1000).toFixed()}:R> "__${afksystem.reason}__" sebebiyle **AFK** moduna girmişti!`)]}).then(async msg => {setTimeout(async() => {if(msg) await msg.delete();},10000);})
}
    }
}

module.exports = afk
