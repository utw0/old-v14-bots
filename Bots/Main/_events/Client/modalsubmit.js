const { Event } = require("../../../../Global/Structures/Default.Events");
const { EmbedBuilder,PermissionsBitField,InteractionType, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,TextInputStyle, SelectMenuBuilder,TextInputBuilder , Formatters, ActionRow} = require("discord.js");
const tagsistem = require("../../../../Global/Database/SystemDB/guildTag")
const { CronJob } = require("cron");
const {Collection} = require("discord.js")
class modalsubmit extends Event {
    constructor(client) {
        super(client, {
            name: "interactionCreate",
            enabled: true,
        });    
    }    

 async onLoad(interaction) {
    if (interaction.type != InteractionType.ModalSubmit) return;
    if (interaction.customId === 'publicTag') {
        const tur = "Public";
        const tag = await interaction.fields.getTextInputValue("tag");
        if(!tag) return  interaction.reply({content:"Sunucu Tagını Düzgün Bir Şekilde Giriniz.",ephemeral:true})
        const tagsiztag = await interaction.fields.getTextInputValue("tagsiz");
        if(!tagsiztag) return  interaction.reply({content:"Sunucuda tagsızlara verilen tagı Düzgün Bir Şekilde Giriniz.",ephemeral:true})
        const tagrol = await interaction.fields.getTextInputValue("tagrol");
        if(!tagrol || !interaction.guild.roles.cache.get(tagrol)) return  interaction.reply({content:"Tag Rolünün ID'sini düzgün gir şekilde girin.",ephemeral:true})
        const taglog = await interaction.fields.getTextInputValue("taglog");
        if(!taglog || !interaction.guild.channels.cache.get(taglog)) return  interaction.reply({content:"Tag Log Kanalının ID'sini düzgün bir şekilde girin.",ephemeral:true})
        await tagsistem.findOneAndUpdate({guildID:interaction.guild.id},{$set:{only:true,Type:tur,Tag:tag,unTag:tagsiztag,tagRol:tagrol,tagLog:taglog}},{upsert:true})
        const data = await tagsistem.findOne({guildID:interaction.guild.id});
        await interaction.reply({content:`**Tag Modu** ayarları aşağıdaki gibi yapılmıştır.\n\n• Sunucu: **${data.Type}**\n• Tag: **${data.Tag}**\n• Tagsız: **${data.unTag}**\n• Tag Rol: **${interaction.guild.roles.cache.get(data.tagRol).name}**\n• Tag Log: **<#${data.tagLog}>**`,ephemeral:true})
    }
    if(interaction.customId == "ekipTag"){
        const tur = "Ekip";
        const tag = await interaction.fields.getTextInputValue("taglar");
        let tags = tag.split(",")
        if(!tag || !tags) return  interaction.reply({content:"Ekip taglarınızı düzgün bir şekilde giriniz.",ephemeral:true})
        const isimbaşıtaglar = await await interaction.fields.getTextInputValue("taglitagsiz")
        let isimbaşıtaglars = isimbaşıtaglar.split(", ")
        const etikettag = await interaction.fields.getTextInputValue("etag");
        if(!etikettag) return  interaction.reply({content:"Sunucu Etiket Tagını Düzgün Bir Şekilde Giriniz.",ephemeral:true})
        const tagrol = await interaction.fields.getTextInputValue("tagrol");
        if(!tagrol || !interaction.guild.roles.cache.get(tagrol)) return  interaction.reply({content:"Tag Rolünün ID'sini düzgün gir şekilde girin.",ephemeral:true})
        const taglog = await interaction.fields.getTextInputValue("taglog");
        if(!taglog || !interaction.guild.channels.cache.get(taglog)) return  interaction.reply({content:"Tag Log Kanalının ID'sini düzgün bir şekilde girin.",ephemeral:true})
        await tagsistem.findOneAndUpdate({guildID:interaction.guild.id},{$set:{only:true,Type:tur,Tag:isimbaşıtaglars[0], unTag:isimbaşıtaglars[1],nameTags:tags,NumberTag:etikettag,tagRol:tagrol,tagLog:taglog}},{upsert:true})
        const data = await tagsistem.findOne({guildID:interaction.guild.id});
        interaction.reply({content:`**Tag Modu** ayarları aşağıdaki gibi yapılmıştır. \n\n• İsim Tagları: **${data.nameTags.join(", ")}**\n• Etiket Tagı: **#${data.NumberTag}**\n• Taglı Simge: **${data.Tag}**\n• Tagsız Simge: **${data.unTag}**\n• Tag Rolü: **${interaction.guild.roles.cache.get(data.tagRol).name}**\n• Tag Log: **<#${data.tagLog}>**`, ephemeral:true})
    }
 }
}    


module.exports = modalsubmit;
