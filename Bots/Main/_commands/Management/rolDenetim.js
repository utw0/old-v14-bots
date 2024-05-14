
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder ,SelectMenuBuilder,Formatters } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
class rolDenetim extends Command {
    constructor(client) {
        super(client, {
            name: "rolDenetim",
            description: "Son silinen mesaj hakkında bilgi verir.",
            usage: ".rolDenetim",
            category: "Management",
            aliases: ["rolDenetim","rd","roldenetim","rol"],

            enabled: true,
        });
    }
 async onRequest (client, message, args,embed) {
    if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
    ||
    [...roles.kurucuPerms,...roles.üstYönetimPerms,roles.banStaffRole].some(x=> message.member.roles.cache.has(x))){
const role = await message.mentions.roles.first() || await message.guild.roles.cache.get(args[0]);
if(!role) return cevap(message,"rolYok");
const menu = await new ActionRowBuilder()
.addComponents(
await new SelectMenuBuilder()
.setCustomId("rolDenetim")
.setPlaceholder("Menüden bir işlem seçin!")
.setOptions(
    [
        {label:"📝",description:"Rol üyelerini listele!",value:"hepsi"},
        {label:"🔉",description:"Role sahip seste ki üyeleri listeler",value:"sesteolan"},
        {label:"🔇",description:"Role sahip seste olmayan üyeleri listeler",value:"sesteolmayan"},
        {label:"🟢",description:"Role sahip 'Çevrimiçi' üyeleri listeler",value:"cevrimici"},
        {label:"🔴",description:"Role sahip 'Çevrimdışı' üyeleri listeler",value:"cevrimdisi"},
    ]
    )
)
const uyeler = role.members.filter(member=>!member.user.bot).size
const botlar = role.members.filter(member=> member.user.bot).size
const cevrimici = role.members.filter(member=>!member.user.bot&& member.presence && member.presence.status != "offline").size
const cevrimdisi = role.members.filter(member=>!member.user.bot && !member.presence).size
const ses = role.members.filter(member=>!member.user.bot &&  member.voice && member.voice.channel).size
const sesteYok = role.members.filter(member=>!member.user.bot &&  (!member.voice.channel)).size
const susturulmus = role.members.filter(member=>!member.user.bot &&  (member.voice && member.voice.channel) && member.voice.selfMute == true).size
const susturulmamis = role.members.filter(member=>!member.user.bot &&  (member.voice && member.voice.channel) && member.voice.selfMute == false).size
const sunucudaSusturulmus = role.members.filter(member=> !member.user.bot && (member.voice && member.voice.channel) && member.voice.serverMute == true).size
const kulaklikKapali = role.members.filter(member=>!member.user.bot &&  (member.voice && member.voice.channel) && member.voice.selfDeaf == true).size
const kulaklikAcik = role.members.filter(member=>!member.user.bot &&  (member.voice && member.voice.channel) && member.voice.selfDeaf == false).size
const sunucudakulakligiKapali = role.members.filter(member=>!member.user.bot &&  (member.voice && member.voice.channel) && member.voice.serverDeaf ==true).size
const kamera = role.members.filter(member=>!member.user.bot &&  (member.voice && member.voice.channel) && member.voice.selfVideo == true).size
const yayin = role.members.filter(member=>!member.user.bot &&  (member.voice && member.voice.channel) && member.voice.streaming== true).size
message.channel.send({embeds:[embed.setDescription(`${role} rolüne ait detaylı bilgiler aşağıda verilmiştir.

\` - \` ${role} rolünde toplam **${uyeler} (\`+ ${botlar} 🤖\`)** kişi bulunuyor.

\` | \` **${cevrimici}** kişi __çevrimiçi__.
\` | \` **${cevrimdisi}** kişi __çevrimdışı__. 
\` | \` **${ses}** kişi __ses kanallarında__ bulunuyor.
\` | \` **${sesteYok}** kişi herhangi bir __ses kanalında__ bulunmuyor.
\` | \` **${susturulmus} (\`+ ${sunucudaSusturulmus} 🟥\`)** kişi __mikrofonu__ açık.
\` | \` **${susturulmamis}** kişinin __mikrofonu__ kapalı.
\` | \` **${kulaklikAcik}** kişinin __kulaklığı__ açık.
\` | \` **${kulaklikKapali} (\`+${sunucudakulakligiKapali} 🟥\`)** Kişinin __kulaklığı__ kapalı.
\` | \` **${kamera}** kişi __kamera__ açmış.
\` | \` **${yayin}** kişi __yayın__ açmış. 
`)],components:[menu]})
.then(async msg =>{
    var filter = (i) => i.user.id === message.member.id;
    const collector = msg.createMessageComponentCollector({ filter, time: 30000*2 })
    collector.on('collect', async (interaction) => {
        await interaction.deferUpdate();
        if(interaction.values[0] == "hepsi"){
        var uyeListe = [];
        role.members.filter(member=> !member.user.bot).forEach(member=>{uyeListe.push({memberTag:member.user.tag,online:member.presence ? true:false,voice:member.voice && member.voice.channel? true:false})})
        let list = chunkify(uyeListe,20);
        for (let index = 0; index < list.length; index++) {
            const listeİcerik = list[index];
        interaction.channel.send({
            content:`${Formatters.codeBlock("md",
            `${listeİcerik.map(x=> `# ${x.memberTag}\n${x.online == true ? `< Çevrimiçi 🟢`:`> Çevrimdışı`}\n${x.voice == true ? `< Seste 🔉`:`> Seste Değil 🔇`}`).join("\n")}`)}`
        })
        }
        }
        if(interaction.values[0] == "sesteolan"){
            if(role.members.filter(member=> !member.user.bot && (member.voice && member.voice.channel)).size == 0) return interaction.channel.send({content:`Ses kanallarında bu role sahip kimse bulunamadı.`})
            var uyeListe = [];
            role.members.filter(member=> !member.user.bot && (member.voice && member.voice.channel)).forEach(member=>{uyeListe.push({memberTag:member.user.tag,channel:member.voice.channel.name,memberId:member.id})})
            let list = chunkify(uyeListe,20);
            for (let index = 0; index < list.length; index++) {
                const listeİcerik = list[index];
            interaction.channel.send({
                content:`**Seste olan üyeler:**\n${Formatters.codeBlock("md",
                `${listeİcerik.map(x=> `# ${x.memberTag}\n< Ses Kanalı: #${x.channel}`).join("\n")}`)}`
            })
            }
        }
        if(interaction.values[0] == "sesteolmayan"){
            if(role.members.filter(member=> !member.user.bot && !member.voice.channel).size == 0) return interaction.channel.send({content:`Bu role seste olmayan kullanıcılar bulunamadı`})
            var uyeListe = [];
            role.members.filter(member=> !member.user.bot && !member.voice.channel).forEach(member=>{uyeListe.push({memberId:member.id})})
            let list = chunkify(uyeListe,20);
            for (let index = 0; index < list.length; index++) {
                const listeİcerik = list[index];
            interaction.channel.send({
                content:`**Seste olmayan üyeler:**\n${Formatters.codeBlock("md",
                `${listeİcerik.map(x=> `<@${x.memberId}>`).join(", ")}`)}`
            })
            }   
        }
    
        if(interaction.values[0] == "cevrimici"){
            var uyeListe = [];
            role.members.filter(member=>!member.user.bot&& member.presence && member.presence.status != "offline").forEach(member=>{uyeListe.push({memberTag:member.user.tag})})
            let list = chunkify(uyeListe,20);
            for (let index = 0; index < list.length; index++) {
                const listeİcerik = list[index];
            interaction.channel.send({
                content:`**Çevrimiçi üyeler:**\n${Formatters.codeBlock("md",
                `${listeİcerik.map(x=> `# ${x.memberTag}`).join("\n")}`)}`
            })
            }      
        }
        if(interaction.values[0] == "cevrimdisi"){
            var uyeListe = [];
            role.members.filter(member=>!member.user.bot&& !member.presence).forEach(member=>{uyeListe.push({memberId:member.id})})
            let list = chunkify(uyeListe,20);
            for (let index = 0; index < list.length; index++) {
                const listeİcerik = list[index];
            interaction.channel.send({
                content:`**Çevrimdışı üyeler:**\n${Formatters.codeBlock("md",
                `${listeİcerik.map(x=> `<@${x.memberId}>`).join(", ")}`)}`
            })
            }             
        }
    })
})
}else return cevap(message,"komutKullanamazsın")
}
}
module.exports = rolDenetim;