
const { EmbedBuilder,PermissionsBitField,Formatters, ActionRowBuilder,SelectMenuBuilder, ButtonBuilder, ButtonStyle,ChannelType,PermissionFlagsBits  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const perms = require("../../../../Global/Database/SystemDB/perm")
class Perm extends Command {
    constructor(client) {
        super(client, {
            name: "perm",
            description: "perm",
            usage: ".perm",
            category: "Approval",
            aliases: ["perm"],
            enabled: true,

            cooldown: 3500,
            guildOwner:true,
            developer : true
        });
    }
    
async onRequest (client, message, args,embed) {
    if(!["ekle","çıkar","liste"].some(x=> args[0] == x)) return message.reply({content:"`Ekle:` **.perm ekle komutIsmi RolID YetkiliRolID**\n`Çıkar:` **.perm çıkar** (menüden seçim)\n`Liste:` **.perm liste**"})
    if(args[0] == "ekle"){
    const komutisim = args[1];
    const permRolID = args[2];
    const yetkiRolID = args[3];
    if(!komutisim || !permRolID || !yetkiRolID) return message.reply({content:"Argumanları doğru şekilde yerleştirip tekrar deneyiniz. `.perm ekle komutismi verilicekRolID YetkiliRolID`"})
    const data = await perms.findOne({guildID:message.guild.id})
    const permsData = data ? data.perms : [];
    if(permsData.some(veri=> veri == (komutisim))) return message.reply({content:`Bu komut daha önce zaten eklenmiş`})
    await perms.findOneAndUpdate({guildID:message.guild.id},{$push:{perms:{permID:permRolID,permName:komutisim,staffRoleID:yetkiRolID}}},{upsert:true})
    message.channel.send({embeds:[embed.setDescription(`${Formatters.codeBlock("md",`# Komut Eklendi!\n< Kullanım: .${komutisim} <@Luppux/ID>\n> ${komutisim}\n> ${message.guild.roles.cache.get(permRolID).name}\n> ${message.guild.roles.cache.get(yetkiRolID).name} `)}`)]})
    }
    if(args[0] == "çıkar"){
        const data = await perms.findOne({guildID:message.guild.id})
        const permsData = data ? data.perms : [];
        var liste = [{label:"İşlemi iptal et!",description:"Menüyü Kapatır.",value:`iptal`}];
        for (let i = 0; i < permsData.length; i++) {
            const veri = permsData[i];
            liste.push({label:`Komut: ${veri.permName}`,description:`Rol: ${message.guild.roles.cache.get(veri.permID) ? message.guild.roles.cache.get(veri.permID).name : "Rol Silinmiş."}`,value:`${veri.permName}-${i}`})
        }
    const menu = new ActionRowBuilder()
    .addComponents(
        new SelectMenuBuilder()
        .setCustomId("permler")
        .setOptions(liste)
        .setPlaceholder("Silmek istediğin komutu seç")
    )
    message.channel.send({components:[menu],embeds:[embed.setDescription(`Listesen silmek istediğiniz komutu seçiniz.`)]}).then(async msg =>{
        var filter = (button) => button.user.id === message.author.id;
        const collector = msg.createMessageComponentCollector({ filter, time: 30000*2 })
        collector.on("collect",async(i)=>{
        await i.deferUpdate();
        for (let index = 0; index < liste.length; index++) {
        if(i.values[0] == `${liste[index].value}`){
        await perms.findOneAndUpdate({guildID:message.guild.id},{$pull:{perms:{permName:liste[index].values}}},{upsert:true})
        message.channel.send({content:"`Komut başarıyla silindi!`"}).then(x=>{setTimeout(() => {if(x) x.delete();}, 5000);})
        }
        }   
        if(i.values[0] == "iptal") {
            if(msg) await msg.delete();
            if(message) await message.delete();
            } 
        })
    })
    }
    if(args[0] == "liste"){
        const data = await perms.findOne({guildID:message.guild.id})
        const permsData = data ? data.perms : [];
        message.channel.send({embeds:[embed.setDescription(`toplam **${permsData.length}** ek komut aşağıda listelenmiştir. \n\n ${permsData.length == 0 ? " " : `${Formatters.codeBlock("md",
        `${permsData.map(x=> `# ${x.permName.toUpperCase()} \n> Kullanım: .${x.permName} @Luppux/ID\n< Rol: ${message.guild.roles.cache.get(x.permID) ? message.guild.roles.cache.get(x.permID).name : "Rol Silinmiş."}\n< Y. Rolü: ${message.guild.roles.cache.get(x.staffRoleID) ? message.guild.roles.cache.get(x.staffRoleID).name : "Rol Silinmiş."}`).join("\n")}`
        )}`}`)]})
    }
    }
}
module.exports = Perm
