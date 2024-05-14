const { Collection, EmbedBuilder, PermissionsBitField,Formatters } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const cooldown = new Collection();
const ms = require('ms');
const snipe = require("../../../../Global/Database/snipe")


class guildMemberRemove extends Event {
    constructor(client) {
        super(client, {
            name: "guildMemberRemove",
            enabled: true,
        });
    }
    
 async onLoad(member) {
if(member.user.bot) return;
await dataCheck(undefined,member.id,"member")
const log = await member.guild.channels.cache.find(x=> x.name == "leave-log")
if(log) await log.send({embeds:[
    new EmbedBuilder()
    .setAuthor({name:member.user.tag,iconURL:member.user.avatarURL({dynamic:true})})
    .setDescription(`${member}, <t:${(Date.now()/1000).toFixed()}:R> sunucudan ayrıldı,**${member.guild.memberCount}** kullanıcı olduk!`)]})
    }
}

module.exports = guildMemberRemove
