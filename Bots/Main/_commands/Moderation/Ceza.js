
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle , ModalBuilder ,TextInputStyle, SelectMenuBuilder,TextInputBuilder , Formatters} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const {Guild} = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Users")
const cezapuan = require("../../../../Global/Database/penaltyDB/cezapuan")
const penalty =require("../../../../Global/Database/penaltyDB/penaltys")
const mute = require("../../../../Global/Database/penaltyDB/mute")
const vmute = require("../../../../Global/Database/penaltyDB/vmute")


const ms = require("ms");
class Ceza31 extends Command {
    constructor(client) {
        super(client, {
            name: "Ceza",
            description: "ID'si girilen kullanıcıyı süreli bir şekilde sunucunun metin kanallarında susturur",
            usage: ".ceza @Lulushu/ID <süre> <sebep>",
            category: "Moderasyon",
            aliases: ["ceza","Ceza","jail","karantina","mute","MUTE","Vmute","vmute","chatmute","sesmute","mutecik"],
            enabled: true,
        });
    }
async onRequest (client, message, args,embed) {
    let CMute;
    let VMute;
    let Jailc;
    let İptal

    const row = new ActionRowBuilder()
        .addComponents(
            CMute = new ButtonBuilder()
            .setCustomId("cmute")
            .setLabel("Chat Mute")
            .setStyle(ButtonStyle.Primary),
            VMute = new ButtonBuilder()
            .setCustomId("vmute")
            .setLabel("Voice Mute")
            .setStyle(ButtonStyle.Primary),
            Jailc = new ButtonBuilder()
            .setCustomId("jail")
            .setLabel("Jail")
            .setStyle(ButtonStyle.Primary),
            İptal = new ButtonBuilder()
            .setCustomId("iptal")
            .setLabel("İptal")
            .setStyle(ButtonStyle.Danger),
          
    );
// 31 ÇEKMEK YASAK OÇ 

if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [...roles.kurucuPerms,...roles.üstYönetimPerms,roles.jailedStaffRole,roles.voiceMuteStaffRole,roles.chatMuteStaffRole].some(x=> message.member.roles.cache.has(x))){
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return cevap(message,"memberYok")
    if (member.user.bot) return cevap(message,"bot")
    if (!member.manageable) return cevap(message,"yetersizYetki")
    if (member.roles.highest.position >= message.member.roles.highest.position && !client.owners.includes(message.author.id)) return cevap(message,"üstAynıYetki")
    const data = await penalty.find();
    let cezakontrol = data.filter(x=> x.penaltys.some(x=> x.type == "CHAT-MUTE" && x.Punished == member.id && x.Finished == false)).length > 0
    if(member.roles.cache.has(roles.chatMutedRole) || cezakontrol) return message.reply({content:`**${member.user.tag}**, Aktif cezası bulunduğu için susturma işlemi yapılamaz.`})
   
    message.reply({ embeds:[embed.setDescription(`${member}, Üyesinin ceza türünü aşağıda ki buttonlardan belirleyiniz.`)], components: [row] }).then(async msg => {

            const filter = i =>{
             i.deferUpdate();
             return i.user.id === message.member.id;}
             const collector = msg.createMessageComponentCollector({ filter, time: 15000 });
         collector.on('collect', async i => {
           let button = i.customId ? i.customId : "Yok"
           if (button == 'iptal' ) {
            row.components[0].setDisabled(true) 
            row.components[1].setDisabled(true) 
            row.components[2].setDisabled(true) 
            row.components[3].setDisabled(true) 
            msg.edit({ components: [row] }); 
            message.reply({ content: `İşlem iptal edildi.`}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))

           }
           if (button == 'cmute' ) {
            const secim = new Discord.ActionRowBuilder().addComponents(
                new Discord.StringSelectMenuBuilder().setPlaceholder('Chat Mute Sebebini Seçiniz.').setCustomId('chatmutesebep').addOptions(
                    { label: "Kışkırtma, Trol ve Dalgacı Davranış", description: "5 Dakika", value: "c1", },
                    { label: "Flood,Spam ve Capslock Kullanımı", description: "5 Dakika", value: "c2", },
                    { label: "Metin Kanallarını Amacı Dışında Kullanmak", description: "10 Dakika", value: "c3", },
                    { label: "Küfür, Argo, Hakaret ve Rahatsız Edici Davranış", description: "5 Dakika", value: "c4", },
                    { label: "Abartı, Küfür ve Taciz Kullanımı", description: "30 Dakika", value: "c5", },
                    { label: "Dini, Irki ve Siyasi değerlere Hakaret", description: "14 Gün", value: "c6", },
                    { label: "Sunucu Kötüleme ve Kişisel Hakaret", description: "1 Saat", value: "c7", },
                ));

                msg.edit({components: [secim], embeds: [embed.setDescription(`
Aşadağı ki menüden **Chat Mute** cezası için sebep belirtiniz.                    
\`\`\`js
1. Kışkırtma, Trol ve Dalgacı Davranış
2. Flood,Spam ve Capslock Kullanımı
3. Metin Kanallarını Amacı Dışında Kullanmak
4. Küfür, Argo, Hakaret ve Rahatsız Edici Davranış
5. Abartı, Küfür ve Taciz Kullanımı
6. Dini, Irki ve Siyasi değerlere Hakaret
7. Sunucu Kötüleme ve Kişisel Hakaret
\`\`\` `)]
                })
                var filter = (component) => component.user.id === message.author.id;
                const collector = msg.createMessageComponentCollector({ filter, time: 30000 })
                collector.on('collect', async (interaction) => {
                    if (msg) msg.delete();
                    if (interaction.values[0] == "c1"){ await CMuted(member, message, "Kışkırtma, Trol ve Dalgacı Davranış", "5m", "5 Dakika", embed) }
                    if (interaction.values[0] == "c2"){ await CMuted(member, message, "Flood,Spam ve Capslock Kullanımı", "5m", "5 Dakika", embed) }
                    if (interaction.values[0] == "c3"){ await CMuted(member, message, "Metin Kanallarını Amacı Dışında Kullanmak", "10m", "10 Dakika", embed) }
                    if (interaction.values[0] == "c4"){ await CMuted(member, message, "Küfür, Argo, Hakaret ve Rahatsız Edici Davranış", "5m", "5 Dakika", embed) }
                    if (interaction.values[0] == "c5"){ await CMuted(member, message, "Abartı, Küfür ve Taciz Kullanımı", "30m", "30 Dakika", embed) }
                    if (interaction.values[0] == "c6"){ await CMuted(member, message, "Dini, Irki ve Siyasi değerlere Hakaret", "14d", "14 Gün", embed) }
                    if (interaction.values[0] == "c7"){ await CMuted(member, message, "Sunucu Kötüleme ve Kişisel Hakaret", "1h", "1 Saat", embed) }
                
                    message.react(client.emojis.cache.find(x => x.name === "appEmoji_tik"))
            await message.reply({content:`${client.emojis.cache.find(x => x.name === "appEmoji_tik")} Susturma (\`Chat Mute\`) İşlemi Başarılı! \n "${member.id}" ID'li kullanıcı <t:${(Date.now() / 1000).toFixed()}> tarihinde (<t:${(Date.now() / 1000).toFixed()}:R>) metin kanallarından susturuldu!`})    
        })
    }
    if (button == 'vmute' ) {
            const secim = new Discord.ActionRowBuilder().addComponents(
                new Discord.StringSelectMenuBuilder().setPlaceholder('Voice Mute Sebebini Seçiniz.').setCustomId('chatmutesebep').addOptions(
                    { label: "Kışkırtma, Trol ve Dalgacı Davranış", description: "5 Dakika", description: "5 Dakika", value: "v1", },
                    { label: "Flood,Spam ve Capslock Kullanımı", description: "5 Dakika", value: "v2", },
                    { label: "Özel Odalara İzinsiz Giriş ve Trol", description: "1 Saat", description: "10 Dakika", value: "v3", },
                    { label: "Küfür, Argo, Hakaret ve Rahatsız Edici Davranış", description: "5 Dakika", value: "v4", },
                    { label: "Abartı, Küfür ve Taciz Kullanımı", description: "30 Dakika", value: "v5", },
                    { label: "Dini, Irki ve Siyasi değerlere Hakaret", description: "14 Gün", value: "v6", },
                    { label: "Sunucu Kötüleme ve Kişisel Hakaret", description: "1 Saat", value: "v7", },
                    { label: "Soundpad, Bass gibi Uygulama Kullanmak", description: "30 Dakika", value: "v8", }
                ));

                msg.edit({components: [secim], embeds: [embed.setDescription(`
Aşadağı ki menüden **Voice Mute** cezası için sebep belirtiniz.                    
\`\`\`js
1. Kışkırtma, Trol ve Dalgacı Davranış
2. Flood,Spam ve Capslock Kullanımı
3. Özel Odalara İzinsiz Giriş ve Trol
4. Küfür, Argo, Hakaret ve Rahatsız Edici Davranış
5. Abartı, Küfür ve Taciz Kullanımı
6. Dini, Irki ve Siyasi değerlere Hakaret
7. Sunucu Kötüleme ve Kişisel Hakaret
8. Soundpad, Bass gibi Uygulama Kullanmak
\`\`\` `)]
                })
                var filter = (component) => component.user.id === message.author.id;
                const collector = msg.createMessageComponentCollector({ filter, time: 30000 })
             // 1000 * 60 * 5 
                collector.on('collect', async (interaction) => {
                    if (msg) msg.delete();
                    if (interaction.values[0] == "v1"){ await VMuted(member, message, "Kışkırtma, Trol ve Dalgacı Davranış", "5m", "5 Dakika", embed) }
                    if (interaction.values[0] == "v2"){ await VMuted(member, message, "Flood,Spam ve Capslock Kullanımı", "5m", "5 Dakika", embed) }
                    if (interaction.values[0] == "v3"){ await VMuted(member, message, "Özel Odalara İzinsiz Giriş ve Trol", "10m", "10 Dakika", embed) }
                    if (interaction.values[0] == "v4"){ await VMuted(member, message, "Küfür, Argo, Hakaret ve Rahatsız Edici Davranış", "5m", "5 Dakika", embed) }
                    if (interaction.values[0] == "v5"){ await VMuted(member, message, "Abartı, Küfür ve Taciz Kullanımı", "30m", "30 Dakika", embed) }
                    if (interaction.values[0] == "v6"){ await VMuted(member, message, "Dini, Irki ve Siyasi değerlere Hakaret", "14d", "14 Gün", embed) }
                    if (interaction.values[0] == "v7"){ await VMuted(member, message, "Sunucu Kötüleme ve Kişisel Hakaret", "1h", "1 Saat", embed) }
                    if (interaction.values[0] == "v8"){ await VMuted(member, message, "Soundpad, Bass gibi Uygulama Kullanmak", "1m", "30 Dakika", embed) }
                
                    message.react(client.emojis.cache.find(x => x.name === "appEmoji_tik"))
                    if(member.voice) await member.voice.setMute(true);
            await message.reply({content:`${client.emojis.cache.find(x => x.name === "appEmoji_tik")} Susturma (\`Voice Mute\`) İşlemi Başarılı! \n "${member.id}" ID'li kullanıcı <t:${(Date.now() / 1000).toFixed()}> tarihinde (<t:${(Date.now() / 1000).toFixed()}:R>) ses kanallarından susturuldu!`})    
        })
        
    }
    if (button == 'jail' ) {
        const secim = new Discord.ActionRowBuilder().addComponents(
            new Discord.StringSelectMenuBuilder().setPlaceholder('Jail Sebebini Seçiniz.').setCustomId('chatmutesebep').addOptions(
                { label: "Cinsellik, taciz ve ağır hakaret", description: "7 Gün", value: "j1", },
                { label: "Sunucu kurallarına uyum sağlamamak", description: "3 Gün", value: "j2", },
                { label: "Sesli/Mesajlı/Ekran P. DM Taciz", description: "1 Gün", value: "j3", },
                { label: "Dini, Irki ve Siyasi değerlere Hakaret", description: "30 Gün", value: "j4", },
                { label: "Abartı rahatsız edici yaklaşımda bulunmak!", description: "14 Gün", value: "j5", },
                { label: "Sunucu içerisi abartı trol / Kayıt trol yapmak!", description: "3 Gün", value: "j6", },
                { label: "Sunucu Kötüleme / Saygısız Davranış", description: "30 Gün", value: "j7", },
            ));

            msg.edit({components: [secim], embeds: [embed.setDescription(`
Aşadağı ki menüden **Jail** cezası için sebep belirtiniz.                    
\`\`\`js
1. Cinsellik, taciz ve ağır hakaret
2. Sunucu kurallarına uyum sağlamamak
3. Sesli/Mesajlı/Ekran P. DM Taciz
4. Dini, Irki ve Siyasi değerlere Hakaret
5. Abartı rahatsız edici yaklaşımda bulunmak!
6. Sunucu içerisi abartı trol / Kayıt trol yapmak!
7. Sunucu Kötüleme / Saygısız Davranış
\`\`\` `)]
            })
            var filter = (component) => component.user.id === message.author.id;
            const collector = msg.createMessageComponentCollector({ filter, time: 30000 })
         // 1000 * 60 * 5 
            collector.on('collect', async (interaction) => {
                if (msg) msg.delete();
                if (interaction.values[0] == "j1"){ await Jail(member, message, "Cinsellik, taciz ve ağır hakaret", "7d", "7 Gün", embed) }
                if (interaction.values[0] == "j2"){ await Jail(member, message, "Sunucu kurallarına uyum sağlamamak", "3d", "3 Gün", embed) }
                if (interaction.values[0] == "j3"){ await Jail(member, message, "Sesli/Mesajlı/Ekran P. DM Taciz", "1d", "1 Gün", embed) }
                if (interaction.values[0] == "j4"){ await Jail(member, message, "Dini, Irki ve Siyasi değerlere Hakaret", "30d", "30 Gün", embed) }
                if (interaction.values[0] == "j5"){ await Jail(member, message, "Abartı rahatsız edici yaklaşımda bulunmak!", "14d", "14 gün", embed) }
                if (interaction.values[0] == "j6"){ await Jail(member, message, "Sunucu içerisi abartı trol / Kayıt trol yapmak!", "3d", "3 Gün", embed) }
                if (interaction.values[0] == "j7"){ await Jail(member, message, "Sunucu Kötüleme / Saygısız Davranış", "30d", "30 Gün", embed) }
            
                message.react(client.emojis.cache.find(x => x.name === "appEmoji_tik"))
        await message.reply({content:`${client.emojis.cache.find(x => x.name === "appEmoji_tik")} Uzaklaştırma (\`Jail\`) İşlemi Başarılı! \n "${member.id}" ID'li kullanıcı <t:${(Date.now() / 1000).toFixed()}> tarihinde (<t:${(Date.now() / 1000).toFixed()}:R>) metin ve ses kanallarından uzaklaştırıldı!`})    
    })
}
         })})}}}
module.exports = Ceza31;

async function CMuted(member, message, reason, sure, zaman, embed) {
    sure = ms(sure)
    const ceza = await penalty.countDocuments().exec();
    await penalty.findOneAndUpdate({guildID: message.guild.id, userID:member.id, cezaId: ceza+1}, {$set:{penaltys:{Staff:message.member.id, Punished:member.id, SentencingDate:Date.now(),PenaltyEndTime: Date.now()+sure,Finished:false,Reason:reason, type:"CHAT-MUTE"}}},{upsert:true})
    if(roles && roles.chatMutedRole) await member.roles.add(roles.chatMutedRole)
    message.guild.channels.cache.get(channels.cMutedLog).send({embeds:[embed.setDescription(`${member} [\`${member.id}\`], Sunucunun metin kanallarından susturuldu!`).addFields({name:`** **`,value:`\` ❯ \` **Yetkili:** ${message.member} [\`${message.member.user.tag} - ${message.member.id}\`]\n\` ❯ \`** Kullanıcı:** ${member} [\`${member.id}\`]\n\` ❯ \`** Tarih:** <t:${(Date.now() / 1000).toFixed()}> [<t:${(Date.now() / 1000).toFixed()}:R>]\n\` ❯ \`**  Sebep:** ${reason}\n\` ❯ \` **Süre:** ${zaman}`})]})
    await mute.findOneAndUpdate({guildID:message.guild.id, userID:message.member.id},{$inc:{limit:1,mute:1},$push:{mutes:{Punished:member.id, SentencingDate:Date.now(), Type:"C-MUTE", Reason:reason,Finished:false}}},{upsert:true})
    await cezapuan.findOneAndUpdate({guildID:message.guild.id,userID:member.id}, {$inc:{cezapuan:10}},{upsert:true})
    let cezapuandata = await cezapuan.findOne({guildID:message.guild.id,userID:member.id})
    if(channels.penaltyPointsLog !=undefined && message.guild.channels.cache.get(channels.penaltyPointsLog)) message.guild.channels.cache.get(channels.penaltyPointsLog)
    .send({content:`**${member} Ceza puanın güncellendi!.** mevcut ceza puanın **${cezapuandata ? cezapuandata.cezapuan : 0}**`})
};
        
async function VMuted(member, message, reason, sure, zaman, embed) {
    sure = ms(sure)
    const ceza = await penalty.countDocuments().exec();
    await penalty.findOneAndUpdate({guildID: message.guild.id,userID:member.id,  cezaId: ceza+1}, {$set:{penaltys:{Staff:message.member.id, Punished:member.id, SentencingDate:Date.now(),PenaltyEndTime: Date.now()+sure,Reason:reason,Finished:false, type:"VOICE-MUTE"}}},{upsert:true})
    if(roles && roles.voiceMutedRole) await member.roles.add(roles.voiceMutedRole)
    message.guild.channels.cache.get(channels.vMutedLog).send({embeds:[embed.setDescription(`${member} (\`${member.id}\`), Sunucunun metin kanallarından susturuldu!`).addFields({name:`** **`,value:`\` ❯ \` **Yetkili:** ${message.member} [\`${message.member.user.tag} - ${message.member.id}\`]\n\` ❯ \`** Kullanıcı:** ${member} [\`${member.id}\`]\n\` ❯ \`** Tarih:** <t:${(Date.now() / 1000).toFixed()}> [<t:${(Date.now() / 1000).toFixed()}:R>]\n\` ❯ \` **Süre:** ${zaman}\n\` ❯ \`**  Sebep:**\n\`\`\` ${reason} \`\`\``})]})
    await vmute.findOneAndUpdate({guildID:message.guild.id, userID:message.member.id},{$inc:{limit:1,vmute:1},$push:{vmutes:{Punished:member.id, SentencingDate:Date.now(), Type:"C-MUTE", Reason:reason,Finished:false}}},{upsert:true})
    await cezapuan.findOneAndUpdate({guildID:message.guild.id,userID:member.id}, {$inc:{cezapuan:10}},{upsert:true})
    let cezapuandata = await cezapuan.findOne({guildID:message.guild.id,userID:member.id})
    if(channels.penaltyPointsLog !=undefined && message.guild.channels.cache.get(channels.penaltyPointsLog)) message.guild.channels.cache.get(channels.penaltyPointsLog)
    .send({content:`**${member} Ceza puanın güncellendi!.** mevcut ceza puanın **${cezapuandata ? cezapuandata.cezapuan : 0}**`})
};        

async function Jail(member, message, reason, sure, zaman, embed) {
    sure = ms(sure)
    const ceza = await penalty.countDocuments().exec();
    let rolleri = member.roles.cache.filter(x=> x.id != message.guild.id && x.id != roles.boosterRole).map(x=> x.id)
    await penalty.findOneAndUpdate({guildID: message.guild.id,userID:member.id,  cezaId: ceza+1}, {$set:{penaltys:{Staff:message.member.id, Punished:member.id, SentencingDate:Date.now(),PenaltyEndTime: Date.now()+sure,Finished:false, type:"JAIL",Reason:reason,Roles:rolleri}}},{upsert:true})
    await member.roles.set(member.roles.cache.has(roles.boosterRole) ? [roles.jailedRole, roles.boosterRole]:[roles.jailedRole])
    if(channels.jailedLog !=undefined && message.guild.channels.cache.get(channels.jailedLog)) message.guild.channels.cache.get(channels.jailedLog)
    .send({embeds:[embed.setTitle(`#${ceza+1} Numaralı Yeni Ceza`).setDescription(`${member} (\`${member.id}\`), Sunucunun metin ve ses kanallarından uzaklaştırıldı!`).addFields({name:`#${ceza+1} Numaraları Cezanin Detayları;`,value:`\`[•]\` **Yetkili:** ${message.member} (\`${message.member.user.tag} ▬ ${message.member.id}\`)\n\`[•]\`** Kullanıcı:** ${member} (\`${member.id}\`)\n\`[•]\`** İşlem:** Metin ve Ses Kanallarında Uzaklaştırma (Jail)\n\`[•]\`** Tarih:** <t:${(Date.now() / 1000).toFixed()}> (<t:${(Date.now() / 1000).toFixed()}:R>)\n\`[•]\`** Sebep:** ${reason}\n\`[•]\` **Süre:** ${zaman}`})]})
    await mute.findOneAndUpdate({guildID:message.guild.id, userID:message.member.id},{$inc:{limit:1,mute:1},$push:{mutes:{Punished:member.id, SentencingDate:Date.now(), Type:"C-MUTE", Reason:reason,Finished:false}}},{upsert:true})
    await cezapuan.findOneAndUpdate({guildID:message.guild.id,userID:member.id}, {$inc:{cezapuan:15}},{upsert:true})
    let cezapuandata = await cezapuan.findOne({guildID:message.guild.id,userID:member.id})
    if(channels.penaltyPointsLog !=undefined && message.guild.channels.cache.get(channels.penaltyPointsLog)) message.guild.channels.cache.get(channels.penaltyPointsLog)
    .send({content:`**${member} Ceza puanın güncellendi!.** mevcut ceza puanın **${cezapuandata ? cezapuandata.cezapuan : 0}**`})
};

/*

Sicil 


 await mute.findOneAndUpdate({guildID:message.guild.id, userID:message.member.id},{$inc:{limit:1,mute:1},$push:{mutes:{Punished:member.id, SentencingDate:Date.now(), Type:"C-MUTE", Reason:reason,Finished:false}}},{upsert:true})
    await cezapuan.findOneAndUpdate({guildID:message.guild.id,userID:member.id}, {$inc:{cezapuan:10}},{upsert:true})
    let cezapuandata = await cezapuan.findOne({guildID:message.guild.id,userID:member.id})
    if(channels.penaltyPointsLog !=undefined && message.guild.channels.cache.get(channels.penaltyPointsLog)) message.guild.channels.cache.get(channels.penaltyPointsLog)
    .send({content:`**${member} Ceza puanın güncellendi!.** mevcut ceza puanın **${cezapuandata ? cezapuandata.cezapuan : 0}**`})
} else {return message.reply({content:"Bu komutu kullanmak için gerekli yetkilere veya rollere sahip değilsin."})}

*/




 /*   var sure = args[1]
    if(!sure || !ms(sure)) return cevap(message,"sureYok")
    sure = ms(sure)
    let mutesure = args[1].replace(`s`, " Saniye").replace(`m`, " Dakika").replace(`h`, " Saat").replace(`d`, " Gün").replace(`w`, " Hafta")*/

/*

    { label: "Cinsellik, taciz ve ağır hakaret", description: "7 Gün", value: "j1", },
    { label: "Sunucu kurallarına uyum sağlamamak", description: "3 Gün", value: "j2", },
    { label: "Sesli/Mesajlı/Ekran P. DM Taciz", description: "1 Gün", value: "j3", },
    { label: "Dini, Irki ve Siyasi değerlere Hakaret", description: "30 Gün", value: "j4", },
    { label: "Abartı rahatsız edici yaklaşımda bulunmak!", description: "14 Gün", value: "j5", },
    { label: "Sunucu içerisi abartı trol / Kayıt trol yapmak!", description: "3 Gün", value: "j6", },
    { label: "Sunucu Kötüleme / Saygısız Davranış", description: "1 Ay", value: "j7", },

    */