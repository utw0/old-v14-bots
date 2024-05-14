const { Collection, EmbedBuilder, PermissionsBitField } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const cooldown = new Collection();
const ms = require('ms');
const tagsistem = require("../../../../Global/Database/SystemDB/guildTag")


class messageCreate extends Event {
    constructor(client) {
        super(client, {
            name: "messageCreate",
            enabled: true,
        });
    }
    
 async onLoad(message) {
        const tagmsg = message.content.toLocaleLowerCase();
        if(tagmsg == "tag" || tagmsg == ".tag" ||tagmsg == "!tag"){
            const data = await tagsistem.findOne({guildID:message.guild.id});
            const tagsystemonly = data ? data.only : false
            if(tagsystemonly == true){
                if(data.Type == "Public"){
                    await message.reply({content:`${data.Tag}`});
                } else if (data.Type == "Ekip") {
                    await message.reply({content:`**${data.nameTags.join(", ")} | #${data.NumberTag}**`})
                }
            }
        }
        if (message.author.bot || !client.prefix.some(x => message.content.startsWith(x))||(!client.owners.includes(message.author.id) && [...roles.unregisterRoles,roles.bannedTagRole,roles.jailedRole,roles.suspectRole].some(rol=>message.member.roles.cache.has(rol)))  || !message.channel || message.channel.type != 0) return;
        let args = message.content.substring(client.prefix.some(x => x.length)).split(" ");
        let _find = args[0].toLocaleLowerCase()
        args = args.splice(1);
        let command = client.commands.get(_find) || client.aliases.get(_find);
        let embed = new EmbedBuilder().setColor("2F3136").setAuthor({
            name: message.guild.name,
            iconURL: message.guild.iconURL()
        })
    
        if(command) {
            if((!["Say","Sil","Afk"].some(x=> command.name == x)) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator) &&(channels && channels.chatChannel && (message.channel.id == channels.chatChannel))) return message.reply({content:`Bot komutlarını sadece <#1049672586163912705> kanalında kullanabilirsiniz.`}).then(async msg => {
                setTimeout(async() => {
                if(message) await message.delete();
                if(msg) await msg.delete();
                }, 5000);
                })
            if(((command.developer && command.developer == true) && !client.owners.includes(message.author.id)) || ((command.guildOwner && command.guildOwner == true) &&  ![message.guild.ownerId, ...client.owners].some(x=> x == message.author.id)))  return message.reply({embeds: [embed.setDescription(`Bu komutu kullanabilmek için Sunucu sahibi veya Developer olman lazım`)]}).then(msg => {
                setTimeout(() => {
                    msg.delete().catch(err => {})
                }, 5000)
            });
            if(command.permissions && command.permissions.length > 0) {
                if((!command.permissions.some(perm => message.member.permissions.has(perm) || message.member.roles.cache.has(perm) || message.author.id == perm))) return message.reply({embeds: [embed.setDescription(`Bu komutu kullanabilmek için yeterli bir yetkiye sahip değilsin.`)]}).then(msg => {
                    setTimeout(() => {
                        msg.delete().catch(err => {})
                    }, 5000)
                });
            }
            
            if(command.cooldown && cooldown.has(`${command.name}${message.author.id}`)) return message.reply({embeds: [embed.setDescription(`Bu komutu <t:${String(cooldown.get(`${command.name}${message.author.id}`)).slice(0, 10)}:R> kullanabilirsiniz.`)]}).then(msg => {
                setTimeout(() => {
                    msg.delete().catch(err => {})
                }, 5000)
            });
        
            command.onRequest(client, message, args,embed)
            if(message.guild.ownerId != message.author.id && !client.owners.includes(message.author.id) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
                cooldown.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
                setTimeout(() => {
                    cooldown.delete(`${command.name}${message.author.id}`)
                }, command.cooldown);
            }
        }
        
    }
}

module.exports = messageCreate
