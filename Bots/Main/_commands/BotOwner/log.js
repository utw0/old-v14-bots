
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,ChannelType,PermissionFlagsBits  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Users")
let manuelLoglar = ["join-log","leave-log","level-log","web-guard","offline-control","emojisticker-guard","server-guard","bankick-guard","channel-guard","role-guard","Suspicious_log","kayıtsız_log","kayıt_log","yasaklıtag_log","görev-log","audit-log","message_log","voicejoin_log","voiceswitch_log","voiceleave_log","streamingstart_log","streamingstop_log","roleadd_log","roleremove_log","displayname_log","camerastart_log","camerastop_log"]
class Log extends Command {
    constructor(client) {
        super(client, {
            name: "Log",
            description: "Log kanallarını kurmak/silmek içindir.",
            usage: ".log (metin/embed)",
            category: "Approval",
            aliases: ["log"],

            enabled: true,

            developer : true
        });
    }
    

    onLoad(client) {
    
    }

 async onRequest (client, message, args,embed) {
if(args[0] == "kur"){
    message.reply({content:`<t:${((Date.now()+4000)/1000).toFixed()}:R> Log kanalları kurulumu başlatılıcaktır.`}).then(async msg => {
    setTimeout(async () => {
    await msg.edit({content:"**Log kanalları kurulumu başladı.**"})
    let kat;
    if(!message.guild.channels.cache.find(x=> x.name == "Luppux-Log")) kat = await message.guild.channels.create({name:"Luppux-Log",type:ChannelType.GuildCategory,  permissionOverwrites: [{id: message.guild.id,deny: [PermissionFlagsBits.ViewChannel]}]});
    if(message.guild.channels.cache.find(x=> x.name == "Luppux-Log")) kat = await message.guild.channels.cache.find(x=> x.name == "Luppux-Log")
            manuelLoglar.forEach(async kanal => {
                if(!message.guild.channels.cache.find(x=> x.name == kanal)){ await message.guild.channels.create({name:kanal,type:ChannelType.GuildText,  permissionOverwrites: [{id: message.guild.id,deny: [PermissionFlagsBits.ViewChannel]}]}).then(async channel => await channel.setParent(kat, { lockPermissions: true }));}
            })
            await msg.edit({content:"Log kanalları kurulumu tamamlandı!"})
        
    }, 4000);
    })

}
if(args[0] == "kaldir" || args[0] == "sil" || args[0] == "kaldır") {
    message.reply({content:`<t:${((Date.now()+4000)/1000).toFixed()}:R> Mevcut log kanalları kaldırılıyor.`}).then(async msg => {
        setTimeout(async() => {
        await msg.edit({content:"**Log kanalları siliniyor...**"})
        manuelLoglar.forEach(async kanal => {
        if(message.guild.channels.cache.find(x=> x.name == kanal)){await message.guild.channels.cache.find(x=> x.name == kanal).delete() }
        })
        if(message.guild.channels.cache.find(x=> x.name == "Luppux-Log")) message.guild.channels.cache.find(x=> x.name == "Luppux-Log").delete();
        await msg.edit({content:"**Log kanalları silindi.**"})

        }, 4000);
    })   
}
}
}
module.exports = Log;