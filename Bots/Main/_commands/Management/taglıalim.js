
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const tagsistem = require("../../../../Global/Database/SystemDB/guildTag")
const taglialimdb = require("../../../../Global/Database/SystemDB/guild.tagli.alim")
class taglıAlım extends Command {
    constructor(client) {
        super(client, {
            name: "TaglıAlım",
            description: "Taglı alım modunu açar/kapatır.",
            usage: ".taglialim",
            category: "Management",
            aliases: ["taglialim","taglıalım"],
            enabled: true,
            guildOwner:true,
            developer : true
        });
    }
 async onRequest (client, message, args,embed) {
    const data = await tagsistem.findOne({guildID:message.guild.id});
    const tagsystemonly = data ? data.only : false
    if(tagsystemonly == true) {
    let taglialimdata = await taglialimdb.findOne({guildID:message.guild.id});
    let taglialimonly = taglialimdata ? taglialimdata.only:false;
    if(!taglialimdata || taglialimonly == false){
        if(message) await message.react(await emojiBul("appEmoji_tik"))

    await taglialimdb.findOneAndUpdate({guildID:message.guild.id},{$set:{only:true}},{upsert:true});
    message.reply({content:"**Taglı Alım** Modu açıldı! Tagsız kayıt yapılmıcaktır ve tagı salanlar 'kayıtsız' olarak sunucuda kalabiliceklerdir."})
    }
    else{
        if(message) await message.react(await emojiBul("appEmoji_tik"))

        await taglialimdb.findOneAndUpdate({guildID:message.guild.id},{$set:{only:false}},{upsert:true});
        message.reply({content:"**Taglı Alım** Modu kapalı! tüm üyeler sunucuya erişebiliceklerdir."})   
    }
    }
    else 
    {
        if(message) await message.react(await emojiBul("appEmoji_carpi"))

        message.reply({content:"**Tag Modu** kapalı olduğu için bu işlem yapılamaz."})
    }
}
}
module.exports = taglıAlım;