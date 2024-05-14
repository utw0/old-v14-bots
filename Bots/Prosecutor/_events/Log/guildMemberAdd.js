const { Collection, EmbedBuilder, PermissionsBitField,Formatters } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const cooldown = new Collection();
const ms = require('ms');
const snipe = require("../../../../Global/Database/snipe")


class guildMemberAdd extends Event {
    constructor(client) {
        super(client, {
            name: "guildMemberAdd",
            enabled: true,
        });
    }
    
 async onLoad(member) {
if(member.user.bot) return;
const log = await member.guild.channels.cache.find(x=> x.name == "join-log")
if(log) await log.send({embeds:[new EmbedBuilder().setAuthor({name:member.user.tag,iconURL:member.user.avatarURL({dynamic:true})}).setDescription(`${member}, <t:${(Date.now()/1000).toFixed()}:R> sunucuya katıldı, kendisiyle beraber **${member.guild.memberCount}** kullanıcı olduk!`)]})
    }
}

module.exports = guildMemberAdd
