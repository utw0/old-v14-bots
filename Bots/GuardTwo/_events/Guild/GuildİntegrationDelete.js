const { Event } = require("../../../../Global/Structures/Default.Events");
const {Guild} = require("../../../../Global/Config/Guild")
const { Collection, EmbedBuilder, PermissionsBitField } = require('discord.js');
const GuardData = require("../../../../Global/Database/Guard")
const request = require('request');
const guardPenaltyDB = require("../../../../Global/Database/guardPenalty")

class     integrationDelete extends Event {
    constructor(client) {
        super(client, {
            name: "guildIntegrationsDelete",
            enabled: true,
        });    
    }    

 async   onLoad(guildx) {
    if(guildx.id != Guild.ID) return;
    const guild = client.guilds.cache.get(Guild.ID)
    const Guard = await GuardData.findOne({guildID: guild.id})
    const serverGuardonly = Guard ? Guard.serverGuard : false;
    if(serverGuardonly == true){
    let entry = await guild.fetchAuditLogs({type: 82}).then(audit => audit.entries.first());
    if(entry.executor.id == guild.ownerId) return;

    const orusbuevladı = await guild.members.cache.get(entry.executor.id);
    var güvenliSalaklar = Guard ? Guard.serverSafedMembers : ["852800814808694814"]
    const log = guild.channels.cache.find(x => x.name == "server-guard")
    const embed = new EmbedBuilder({
        title:"Server İntegration Protection - Security II",
        footer:{text:`Server Security`, iconURL: client.user.avatarURL()}
    })
    if(!entry || !entry.executor || Date.now() - entry.createdTimestamp > 5000 || orusbuevladı.user.bot)return;
    if (await guvenli(orusbuevladı,"server") == true){
        await guardPenaltyDB.findOneAndUpdate({guildID:guild.id,OrusbuEvladı:orusbuevladı.id},{$push:{işlemler:{Güvenilir:true,işlem:`Entagrasyon Sildi.`,Tarih:Date.now()}}},{upsert:true})
        if(log) return log.send({embeds:[embed.setAuthor({name:`Trustworthy ✅`, iconURL:guild.iconURL()}).setDescription(`${orusbuevladı}, \`${new Date(Date.now()).toTurkishFormatDate()}\` tarihinde entegrasyon silindi.`)]})
    }
    await sik(guild,orusbuevladı.id,"am")
    await ytçek(orusbuevladı)
    await guardPenaltyDB.findOneAndUpdate({guildID:guild.id,OrusbuEvladı:orusbuevladı.id},{$push:{işlemler:{Güvenilir:false,işlem:`Entagrasyon Sildi.`,Tarih:Date.now()}}},{upsert:true})
    if(log) return log.send({embeds:[embed.setAuthor({name:`Not safe ❎`, iconURL:guild.iconURL()}).setDescription(`${orusbuevladı}, \`${new Date(Date.now()).toTurkishFormatDate()}\` tarihinde entegrasyon sildiği için kendisini banladım.`)]})
    }
 }
}
module.exports = integrationDelete;