const { Client, ApplicationCommandType,PermissionsBitField,SelectMenuBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRow , ActionRowBuilder, Formatters,seelct} = require("discord.js");
const guard = require("../../../../Global/Database/Guard")
module.exports = {
    name: "guvenli-liste",
    description: "Güvenli Kategorileri ve içindekiler",
    type: ApplicationCommandType.ChatInput,
    userPermissions: PermissionsBitField.Flags.Administrator,
    onRequest:async (client, interaction) => {
if(![...client.owners,interaction.guild.ownerId].includes(interaction.user.id)) return interaction.reply({content:`Bu komutu sadece <@${interaction.guild.ownerId}> (\`Taç Sahibi\`) ve ${client.owners.map(x=> `<@${x}>`).map(x=> `<@${x}>`).join(", ")} kullanabilir!`,ephemeral:true})
const guardWhitelistData = await guard.findOne({guildID:interaction.guild.id});
var full = guardWhitelistData ? guardWhitelistData.SafedMembers : client.owners
var server = guardWhitelistData ? guardWhitelistData.serverSafedMembers : client.owners
var roles = guardWhitelistData ? guardWhitelistData.roleSafedMembers : client.owners
var channels = guardWhitelistData ? guardWhitelistData.channelSafedMembers : client.owners
var banAndkick = guardWhitelistData ? guardWhitelistData.banKickSafedMembers : client.owners
var emojiAndSticker = guardWhitelistData ? guardWhitelistData.emojiStickers : client.owners
interaction.reply({
    embeds:[
        new EmbedBuilder()
    .setAuthor({name:interaction.guild.name,iconURL:interaction.guild.iconURL({dynamic:true})})
    .setDescription(`**<@${client.owners[0]}> tarafından \`${interaction.guild.name}\` sunucusu için yapılmış __Guard (Koruma)__ sisteminin sunucuda ki her yetki kategorisi için yapılmış olan korumalar ve korumalardan etkilenmicekler kişilerin bulunduğu listeler aşağıda verilmiştir.**`)
    .setFields(
        [
            {name:"Full:",value:`Sunucuda Taç sahibi seviyesinde tam erişime sahip olan kişiler;\n${full.map(x=> `<@${x}>`).join(", ")}`,inline:false},
            {name:"Sunucuyu Yönet:",value:`Sunucu profiline tam erişim iznine sahip olan kişiler;\n ${server.map(x=> `<@${x}>`).join(", ")}`,inline:false},
            {name:"Rolleri Yönet:",value:`Sunucuda ki rollere tam erişim iznine sahip olan kişiler;\n ${roles.map(x=> `<@${x}>`).join(", ")}`,inline:false},
            {name:"Kanalları Yönet:",value:`Sunucu Kanallara tam erişim iznine sahip olan kişiler;\n${channels.map(x=> `<@${x}>`).join(", ")}`,inline:false},
            {name:"Emoji/Sticker Yönet:",value:`Sunucuda Emoji/Stickerlara tam erişim iznine sahip olan kişiler;\n ${emojiAndSticker.map(x=> `<@${x}>`).join(", ")}`,inline:false},
            {name:"Ban&Kick:",value:`Sunucuda ki kullanıcılara sağ tık ban ve kick iznine tam erişimi olan kişiler;\n${banAndkick.map(x=> `<@${x}>`).join(", ")}`,inline:false},
        ]
    )
    ]
})
}
};