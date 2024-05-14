const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle ,VoiceChannel,AttachmentBuilder } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const voice  = require("../../../../Global/Database/Stats/Voice/voiceJoinedAt")
const moment = require("moment")
require("moment-duration-format")
moment.locale("tr")
class Nerde extends Command {
    constructor(client) {
        super(client, {
            name: "Nerde",
            description: "Bot ile mesaj göndermek için",
            usage: ".nerde",
            category: "Moderasyon",
            aliases: ["n","ses"],
            enabled: true,
        });
    }
    

async onLoad(client) {
    client.on("voiceStateUpdate", async (oldState, newState) => {
        if ((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return;
        if (!oldState.channelId && newState.channelId) await joinedAt.findOneAndUpdate({ userID: newState.id }, { $set: { date: Date.now() } }, { upsert: true });
        let joinedAtData = await joinedAt.findOne({ userID: oldState.id });
        if (!joinedAtData) await joinedAt.findOneAndUpdate({ userID: oldState.id }, { $set: { date: Date.now() } }, { upsert: true });
        joinedAtData = await joinedAt.findOne({ userID: oldState.id });
        if (oldState.channelId && !newState.channelId) {
          await joinedAt.deleteOne({ userID: oldState.id });
        } else if (oldState.channelId && newState.channelId) {
          await joinedAt.findOneAndUpdate({ userID: oldState.id }, { $set: { date: Date.now() } }, { upsert: true });
        }
      })

    }

 async onRequest (client, message, args,) {
    if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [roles.botRole].some(x=> message.member.roles.cache.has(x))){
    if (!message.guild) return;

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    if (!user) return message.reply("Ses bilgisine bakmak istediğin kullanıcıyı düzgünce belirt ve tekrar dene!")
    if (!user.voice.channel) return message.reply("<@" + user.id + "> bir ses kanalına bağlı değil.")
    let joinedAtData = await voice.findOne({ userID: user.id });
    let mic = user.voice.selfMute == true ? "Kapalı ❌" : "Açık ✅"
    let limit = user.voice.channel.userLimit || "Limit Yok";
    let hop = user.voice.selfDeaf == true ? "Kapalı ❌" : "Açık ✅"
    let video = user.voice.selfVideo ? `Açık ✅` : `Kapalı ❌`;
    let stream = user.voice.streaming ? `Açık ✅` : `Kapalı ❌`
    let embed = new EmbedBuilder()
.setColor("2F3136")
.setAuthor({name:message.guild.name, iconURL: message.guild.iconURL({dynamic:true})})
.setDescription(`${user}, adlı kullanıcı <#${user.voice.channel.id}> adlı ses kanalında bulunuyor.

・Mikrafonu; \`${mic}\` , Kulaklığı; \`${hop}\`
・Kamerası; \`${video}\`
・Yayın; \`${stream}\`
・Kanaldaki kişi sayısı; \`${user.voice.channel.members.size}/${limit}\`
・Kanalda Bulunma Süresi: \`${joinedAtData ? moment.duration(joinedAtData ? Date.now() - joinedAtData.date : 0).format("H [saat], m [dakika] s [saniye]") : "Süre bulunamadı"} \``)
    await message.reply({embeds:[embed]});


}
}
}
module.exports = Nerde;
