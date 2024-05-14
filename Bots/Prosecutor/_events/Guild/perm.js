const { Collection, EmbedBuilder, PermissionsBitField } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const Perms = require("../../../../Global/Database/SystemDB/perm")
class Perm extends Event {
    constructor(client) {
        super(client, {
            name: "messageCreate",
            enabled: true,
        });
    }
    
 async onLoad(message) {
if(message.member.user.bot) return;
const data = await Perms.findOne({guildID:message.guild.id})
const permsData = data ? data.perms : [];
let args = message.content.toLocaleLowerCase().substring(client.prefix.some(x => x.length)).split(" ");
let talentPerm = permsData.find((e) => e.permName === args[0]);
if (talentPerm) {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    if (!message.member.roles.cache.has(talentPerm.staffRoleID) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)&& !message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)&& !message.member.permissions.has(PermissionsBitField.Flags.BanMembers) && !client.owners.includes(message.author.id)) return;
    if (!member) return message.channel.send(cevaplar.üyeBelirt)
    if (member.roles.cache.has(talentPerm.permID)) {
      member.roles.remove(talentPerm.permID)
      message.channel.send({embeds:[new EmbedBuilder().setColor("2fc893").setAuthor({name: message.author.tag,  iconURL:message.author.avatarURL({ dynamic: true })}).setTimestamp()
    .setDescription(`${member} kullanıcısından <@&${talentPerm.permID}> rolü alındı.`)]}).then(e => setTimeout(() => e.delete(), 5000))
    } else {
      member.roles.add(talentPerm.permID)
      message.channel.send({embeds:[new EmbedBuilder().setColor("2fc893").setAuthor({name: message.author.tag,  iconURL:message.author.avatarURL({ dynamic: true })}).setTimestamp()
      .setDescription(`${member} kullanıcısına <@&${talentPerm.permID}> rolü verdi.`)]}).then(e => setTimeout(() => e.delete(), 5000))
    }
    await message.react("✅")
  }
    }
}

module.exports = Perm
