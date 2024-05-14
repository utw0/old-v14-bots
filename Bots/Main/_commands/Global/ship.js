const { PermissionsBitField,Formatters ,EmbedBuilder,AttachmentBuilder,ActionRowBuilder,ButtonBuilder,ButtonStyle} = require('discord.js');
const { Command } = require("../../../../Global/Structures/Default.Commands");
const {Guild} = require("../../../../Global/Config/Guild")
const Canvas = require('canvas')
class Ship extends Command {
    constructor(client) {
        super(client, {
            name: "ship",
            description: "Ship",
            usage: ".ship",
            category: "Global",
            aliases: ["ship","shipp","SHİP","Ship"],
            enabled: true,

            cooldown: 3500,

        });
    }
    
   async onRequest (client, message, args) {

    let shipcik = message.mentions.users.first() || client.guilds.cache.get(Guild.ID).members.cache.get(args[0])
    
    let erkekrol = roles.manRoles
    let karırol = roles.womanRoles
    let kayıtsızrolü = roles.unregisterRoles
    if (!shipcik || message.author.id === shipcik.id) {
        shipcik = message.guild.members.cache
       .filter(m => m.id !== message.author.id && !kayıtsızrolü.some(x => m.roles.cache.get(x))) 
       .random();
       if(erkekrol.some(x => message.member.roles.cache.has(x))) 
       shipcik = message.guild.members.cache
       .filter(m => m.id !== message.author.id && !kayıtsızrolü.some(x => m.roles.cache.get(x)) && karırol.some(x => m.roles.cache.get(x))) 
       .random();
       if(karırol.some(x => message.member.roles.cache.has(x))) shipcik = message.guild.members.cache
       .filter(m => m.id !== message.author.id && !kayıtsızrolü.some(x => m.roles.cache.get(x)) && erkekrol.some(x => m.roles.cache.get(x))) 
       .random();
       
    }
    shipcik = message.guild.members.cache.get(shipcik.id)

    
    let replies = [
        '5% Uyumlu!',     '3% Uyumlu!',
        '10% Uyumlu!',    '14% Uyumlu!',
        '17% Uyumlu!',    '20% Uyumlu!',
        '22% Uyumlu!',    '25% Uyumlu!',
        '24% Uyumlu!',    '27% Uyumlu!',
        '32% Uyumlu!',    '36% Uyumlu!',
        '34% Uyumlu!',    '39% Uyumlu!',
        '42% Uyumlu!',    '45% Uyumlu!',
        '47% Uyumlu!',    '51% Uyumlu!',
        '54% Uyumlu!',    '56% Uyumlu!',
        '59% Uyumlu!',    '58% Uyumlu!',
        '60% Uyumlu!',  '63% Uyumlu!',
        '65% Uyumlu!', '64% Uyumlu!',
        '68% Uyumlu!',  '70% Uyumlu!',
        '74% Uyumlu!',  '78% Uyumlu!',
        '79% Uyumlu!',  '80% Uyumlu!',
        '83% Uyumlu!',  '86% Uyumlu!',
        '84% Uyumlu!',  '89% Uyumlu!',
        '91% Uyumlu!',  '93% Uyumlu!',
        '95% Uyumlu!',  '97% Uyumlu!',
        '98% Uyumlu!',  '99% Uyumlu!',
        'Evlenek Ne Bekliyon', 'Çabuk Evlenmeniz Gereken Konular Var'
    ]
    

    let emoti ;
    if(client.owners.some(x=> x == message.member.id)){
    emoti = 43;
    } else {
    emoti= Math.floor((Math.random()*replies.length))
    }
    let love = replies[emoti]
    let emoticon;
    if(emoti <= 44 && emoti >= 23) {
       emoticon = ('https://cdn.glitch.com/00963c7e-8e86-4a55-8d85-36add9e330d7%2Femoji_2.png?v=1593651528429'); 
    } else if(emoti < 23 && emoti >= 12) {
        emoticon = ('https://cdn.glitch.com/00963c7e-8e86-4a55-8d85-36add9e330d7%2Femoji_3-1.png?v=1593652255529'); 
    } else if(emoti < 11) {
        emoticon = ('https://cdn.glitch.com/00963c7e-8e86-4a55-8d85-36add9e330d7%2Femoji_1.png?v=1593651511900'); 
    }
    const canvas = Canvas.createCanvas(384, 128);
    const ctx = canvas.getContext('2d');
    const emotes = await Canvas.loadImage(emoticon);
    const avatar1 = await Canvas.loadImage(message.member.user.displayAvatarURL({ extension: "jpg" }));
    const avatar2 = await Canvas.loadImage(shipcik.user.displayAvatarURL({ extension: "jpg" }));
    ctx.beginPath();
    ctx.moveTo(0 + Number(10), 0);
    ctx.lineTo(0 + 384 - Number(10), 0);
    ctx.quadraticCurveTo(0 + 384, 0, 0 + 384, 0 + Number(10));
    ctx.lineTo(0 + 384, 0 + 128 - Number(10));
    ctx.quadraticCurveTo(
    0 + 384,
    0 + 128,
    0 + 384 - Number(10),
    0 + 128
    );
    ctx.lineTo(0 + Number(10), 0 + 128);
    ctx.quadraticCurveTo(0, 0 + 128, 0, 0 + 128 - Number(10));
    ctx.lineTo(0, 0 + Number(10));
    ctx.quadraticCurveTo(0, 0, 0 + Number(10), 0);
    ctx.closePath();
    ctx.clip();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 384, 128);
    let background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1075535580517113986/1078054796524785754/aesthetic-dreamy-background-purple-cloudy-sky-vector-glitter-design_53876-156334.png");
    ctx.drawImage(background, 0, 0, 384, 129);
    ctx.drawImage(emotes, 160, 30, 64, 64);
    ctx.drawImage(avatar1, 20, 20, 96, 96);
    ctx.drawImage(avatar2, 270, 20, 96, 96);
    const img = new AttachmentBuilder().setFile(canvas.toBuffer())
    let Row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
        .setLabel("Tanış!")
        .setDisabled(emoti <= 44 && emoti >= 23 ? false : true)
        .setCustomId("test")
        .setStyle(ButtonStyle.Success)
    )
    message.reply({components: [Row], content: `${shipcik}`,content: `[ **${shipcik.displayName}** & **${message.member.displayName}** ]\nYakışıyor musunuz? **${love}**\nBebisinizin İsmi : **${compareToNames(`${shipcik.displayName}`, `${message.member.displayName}`)}**`, files: [img]})

    .then(async (msg) => {
        msg.react("🥰")
        msg.react("😘")
        msg.react("😳")
        var filter = (i) => i.user.id == message.member.id
        let collector = msg.createMessageComponentCollector({filter: filter, max: 1})
        collector.on('collect', async (i) => {
            if(i.customId == "test") {
    
                const row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                    .setLabel("Profil Görmek İçin Tıkla")
                    .setStyle(ButtonStyle.Link)
                    .setURL(`https://discord.com/users/${shipcik.id}`), )
              
                i.reply({content: `Şuanlık **Yapım Aşamasında** olduğu için ona dmden yazabilirsin dur sana yardım ediyim butona tıkla`,components: [row], ephemeral: true})
               
            }
        })
    
    }
    )
}
        }
    

    function compareToNames(name1, name2) {
        const clear = (name) => name.replace(/[^a-z ]+/gi, "").split(/ +/).filter(Boolean)[0]
        name1 = clear(name1)
        name2 = clear(name2)
      
        return name1.substring(0, 3) + name2.substring(name2.length - 3)
      }
      
      
module.exports = Ship