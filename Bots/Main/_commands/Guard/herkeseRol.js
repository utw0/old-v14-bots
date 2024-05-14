
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Users")
class herkeseRol extends Command {
    constructor(client) {
        super(client, {
            name: "herkeseRol",
            description: "Bot ile mesaj göndermek için",
            usage: ".herkeserol @Rol/ID",
            category: "Guard",
            aliases: ["roldağıt","roldagit","herkeserol","hr"],

            enabled: true,
            guildOwner:true,
            developer : true
        });
    }
  async  onLoad(client) {
    await  startDistributors()
  }

 async onRequest (client, message, args,embed) {
const dagitilicakRol = await message.mentions.roles.first() || await message.guild.roles.cache.get(args[0]);
if(!dagitilicakRol) return cevap(message,"rolYok")
let length = (message.guild.members.cache.filter(member => member && !member.roles.cache.has(dagitilicakRol.id) && !member.user.bot).map(x=> x).length + 5);
const sayı = Math.floor(length / Distributors.length);
for (let index = 0; index < Distributors.length; index++) {
  const bot = Distributors[index];
  if (dagitilicakRol.deleted) {
    message.reply({content:`Rol silindiği için işlem yapılamadı.`})
    client.logger.log(`[${dagitilicakRol.id}] - ${bot.user.tag}`);
    break;
  }
  const members = bot.guilds.cache.get(message.guild.id).members.cache.filter(member => !member.roles.cache.has(dagitilicakRol.id) && !member.user.bot).map(member => member.id).slice((index * sayı), ((index + 1) * sayı));
  if (members.length <= 0) return cevap(message,"veriYok")
  message.channel.send({content:`Toplamda **${message.guild.members.cache.filter(member => member && !member.roles.cache.has(dagitilicakRol.id) && !member.user.bot).map(x=> x).length}** kişiye \`${dagitilicakRol.name}\` rolü dağıtılıyor.`})
  for (const member of members) {
   await bot.guilds.cache.get(message.guild.id).members.cache.get(member).roles.add(dagitilicakRol.id)
  }
}
}
}
module.exports = herkeseRol;