const { Event } = require("../../../../Global/Structures/Default.Events");
const {Guild} = require("../../../../Global/Config/Guild")
const { Collection, EmbedBuilder, PermissionsBitField } = require('discord.js');
const GuardData = require("../../../../Global/Database/Guard")
const request = require('request');
const guardPenaltyDB = require("../../../../Global/Database/guardPenalty")
const fetch = require("node-fetch");
class guildUpdate extends Event {
    constructor(client) {
        super(client, {
            name: "guildUpdate",
            enabled: true,
        });    
    }    

 async   onLoad(oldGuild, newGuild) {
        if(newGuild.id != Guild.ID) return;
        const guild = client.guilds.cache.get(Guild.ID)
        const Guard = await GuardData.findOne({guildID: guild.id})
        const serverGuardonly = Guard ? Guard.serverGuard : false;
        if(serverGuardonly == true){
        const entry = await newGuild.fetchAuditLogs({ type: 1 }).then(audit => audit.entries.first());
        if(entry.executor.id == guild.ownerId) return;

        const orusbuevladı = await guild.members.cache.get(entry.executor.id);
        var güvenliSalaklar = Guard ? Guard.SafedMembers : ["852800814808694814"]
        const log = guild.channels.cache.find(x => x.name == "server-guard")
        const embed = new EmbedBuilder({
            title:"Server Settings Protection - Security II",
            footer:{text:`Server Security`, iconURL: client.user.avatarURL()}
        })
        if(!entry || !entry.executor||Date.now() - entry.createdTimestamp > 5000 || orusbuevladı.user.bot)return;
        if (await guvenli(orusbuevladı,"server") == true){
        if(oldGuild.name != newGuild.name){
        await guardPenaltyDB.findOneAndUpdate({guildID:guild.id,OrusbuEvladı:orusbuevladı.id},{$push:{işlemler:{Güvenilir:true,işlem:"Sunucu Adı Değiştirme",Tarih:Date.now()}}},{upsert:true})
        if(log) return log.send({embeds:[embed.setAuthor({name:`Trustworthy ✅`, iconURL:guild.iconURL()}).setDescription(`${orusbuevladı}, tarafından <t:${(Date.now()/1000).toFixed()}> tarihinde (<t:${(Date.now()/1000).toFixed()}:R>) sunucunun *İsmi** değiştirildi!
        ────────────────────────────────────
        \`Yeni:\`**${newGuild.name}**
        \`Eski:\`**${oldGuild.name}**
        `)]})
        }
        if(oldGuild.iconURL({dynamic: true, size: 2048}) != newGuild.iconURL({dynamic: true, size: 2048})){
            await guardPenaltyDB.findOneAndUpdate({guildID:guild.id,OrusbuEvladı:orusbuevladı.id},{$push:{işlemler:{Güvenilir:true,işlem:"Sunucu İcon Değiştirme",Tarih:Date.now()}}},{upsert:true})

            if(log) return log.send({embeds:[embed.setAuthor({name:`Trustworthy ✅`, iconURL:guild.iconURL()}).setDescription(`${orusbuevladı}, tarafından <t:${(Date.now()/1000).toFixed()}> tarihinde (<t:${(Date.now()/1000).toFixed()}:R>) sunucunun **İcon**u değiştirildi!
            ────────────────────────────────────
            \`Yeni:\`**${newGuild.iconURL({dynamic: true, size: 2048})}**
            \`Eski:\`**${oldGuild.iconURL({dynamic: true, size: 2048})}**
            `)]})
        }
        if(oldGuild.banner !== newGuild.banner){
            await guardPenaltyDB.findOneAndUpdate({guildID:guild.id,OrusbuEvladı:orusbuevladı.id},{$push:{işlemler:{Güvenilir:true,işlem:"Sunucu Afiş Değiştirme",Tarih:Date.now()}}},{upsert:true})

            if(log) return log.send({embeds:[embed.setAuthor({name:`Trustworthy ✅`, iconURL:guild.iconURL()}).setDescription(`${orusbuevladı}, tarafından <t:${(Date.now()/1000).toFixed()}> tarihinde (<t:${(Date.now()/1000).toFixed()}:R>) sunucunun **Afiş**i değiştirildi!
            ────────────────────────────────────
            \`Yeni:\`**${newGuild.bannerURL({dynamic: true})}**
            \`Eski:\`**${oldGuild.bannerURL({dynamic: true})}**
            `)]})       
        }
        if((oldGuild.vanityURLCode && newGuild.vanityURLCode) && (newGuild.vanityURLCode !== oldGuild.vanityURLCode)){
            await guardPenaltyDB.findOneAndUpdate({guildID:guild.id,OrusbuEvladı:orusbuevladı.id},{$push:{işlemler:{Güvenilir:true,işlem:"Sunucu Özel URL Değiştirme",Tarih:Date.now()}}},{upsert:true})

            if(log) return log.send({embeds:[embed.setAuthor({name:`Trustworthy ✅`, iconURL:guild.iconURL()}).setDescription(`${orusbuevladı}, tarafından <t:${(Date.now()/1000).toFixed()}> tarihinde (<t:${(Date.now()/1000).toFixed()}:R>) sunucunun **Özel URL**'si değiştirildi!
            ────────────────────────────────────
            \`Yeni:\`**${newGuild.vanityURLCode}**
            \`Eski:\`**${oldGuild.vanityURLCode}**
            `)]})         
        }
        }
        await ytkapa(Guild.ID)
        await sik(guild,orusbuevladı.id,"am")
        if (newGuild.name !== oldGuild.name){
             await newGuild.setName(oldGuild.name);
             await guardPenaltyDB.findOneAndUpdate({guildID:guild.id,OrusbuEvladı:orusbuevladı.id},{$push:{işlemler:{Güvenilir:false,işlem:"Sunucu Özel URL Değiştirme",Tarih:Date.now()}}},{upsert:true})

             if(log) return log.send({embeds:[embed.setAuthor({name:`Not safe ❎`, iconURL:guild.iconURL()}).setDescription(`${orusbuevladı}, tarafından <t:${(Date.now()/1000).toFixed()}> tarihinde (<t:${(Date.now()/1000).toFixed()}:R>) sunucunun **İsmini** değiştirmeye çalıştı ve kendisini yasaklayıp sunucunun adını \`${oldGuild.name}\` olarak değiştirdim.
             ────────────────────────────────────
             \`Yapmaya Çalıştığı:\`**${newGuild.name}**
             \`Düzelttiğim:\`**${oldGuild.name}**
             `)]})  
            }
            if(oldGuild.iconURL({dynamic: true, size: 2048}) != newGuild.iconURL({dynamic: true, size: 2048})){
                await newGuild.setIcon(oldGuild.iconURL({dynamic: true, size: 2048}));
                await guardPenaltyDB.findOneAndUpdate({guildID:guild.id,OrusbuEvladı:orusbuevladı.id},{$push:{işlemler:{Güvenilir:false,işlem:"Sunucu İcon Değiştirme",Tarih:Date.now()}}},{upsert:true})
    
                if(log) return log.send({embeds:[embed.setAuthor({name:`Not safe ❎`, iconURL:guild.iconURL()}).setDescription(`${orusbuevladı}, tarafından <t:${(Date.now()/1000).toFixed()}> tarihinde (<t:${(Date.now()/1000).toFixed()}:R>) sunucunun **İconunu** değiştirmeye çalıştı ve kendisini yasaklayıp sunucunun iconunu [burada ki](${oldGuild.iconURL()}) ile değiştirdim.
                ────────────────────────────────────
                \`Yapmaya Çalıştığı:\`**${newGuild.iconURL({dynamic: true, size: 2048})}**
                \`Düzelttiğim:\`**${oldGuild.iconURL({dynamic: true, size: 2048})}**
                `)]})
            }
        if (oldGuild.banner !== newGuild.banner){
            await newGuild.setBanner(oldGuild.bannerURL({ size: 4096 }));
            await guardPenaltyDB.findOneAndUpdate({guildID:guild.id,OrusbuEvladı:orusbuevladı.id},{$push:{işlemler:{Güvenilir:false,işlem:"Sunucu Afiş Değiştirme",Tarih:Date.now()}}},{upsert:true})

            if(log) return log.send({embeds:[embed.setAuthor({name:`Not safe ❎`, iconURL:guild.iconURL()}).setDescription(`${orusbuevladı}, tarafından <t:${(Date.now()/1000).toFixed()}> tarihinde (<t:${(Date.now()/1000).toFixed()}:R>) sunucunun **Afişini**  değiştirmeye çalıştı ve kendisini yasaklayıp sunucunun afişini [burada ki](${oldGuild.bannerURL()}) ile değiştirdim.
            ────────────────────────────────────
            \`Yapmaya Çalıştığı:\`**${newGuild.bannerURL({dynamic: true})}**
            \`Düzelttiğim:\`**${oldGuild.bannerURL({dynamic: true})}**
            `)]})    
        }
        if ((oldGuild.vanityURLCode && newGuild.vanityURLCode) && (oldGuild.vanityURLCode != newGuild.vanityURLCode)) {
            const config = {
                url: `https://discord.com/api/v9/guilds/${oldGuild.guild.id}/vanity-url`,
                body: {
                    code: oldGuild.vanityURLCode
                },
                method: 'PATCH',
                headers: {
                    "Accept": "*/*",
                    "Content-Type": "application/json",
                    "Authorization": "s"
                }
            }
          let req = await fetch(config.url, { method: config.method, headers: config.headers, body: JSON.stringify(config.body) }) 
          req = await req.json();            await guardPenaltyDB.findOneAndUpdate({guildID:guild.id,OrusbuEvladı:orusbuevladı.id},{$push:{işlemler:{Güvenilir:false,işlem:"Sunucu Özel URL Değiştirme",Tarih:Date.now()}}},{upsert:true})

            if(log) return log.send({embeds:[embed.setAuthor({name:`Trustworthy ✅`, iconURL:guild.iconURL()}).setDescription(`${orusbuevladı}, tarafından <t:${(Date.now()/1000).toFixed()}> tarihinde (<t:${(Date.now()/1000).toFixed()}:R>) sunucunun **Özel URL**'si değiştirildi!
            ────────────────────────────────────
            \`Yapmaya Çalıştığı:\` **${newGuild.vanityURLCode}**
            \`Düzelttiğim:\` **${oldGuild.vanityURLCode}**
            \`Url Durumu:\` **${oldGuild.vanityURLCode == newGuild.vanityURLCode ? "Kurtarıldı! hahahah ☕":"Kurtarılamadı. URL Spam Aktif Edildi!"}**
            `)]})   
        }
        if(log) return log.send({embeds:[embed.setAuthor({name:`Not safe ❎`, iconURL:guild.iconURL()}).setDescription(`${orusbuevladı}, \`${new Date(Date.now()).toTurkishFormatDate()}\` tarihinde sunucunun ayarlarıyla oynadı ve kendisini sunucudan yasakladım.`)]})
        }
    }
}    



module.exports =  guildUpdate;
