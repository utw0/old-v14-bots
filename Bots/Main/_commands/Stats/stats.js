
const { Command } = require("../../../../Global/Structures/Default.Commands");

const { EmbedBuilder, AttachmentBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, Formatters ,SelectMenuBuilder, StringSelectMenuBuilder, ComponentType } = require("discord.js");
const moment = require("moment");
const Canvas = require("discord-canvas")
const canvacord = require("canvacord")
const statSystemDB = require("../../../../Global/Database/SystemDB/guild.stat.system")
const {Guild} = require("../../../../Global/Config/Guild")
const cezapuan = require("../../../../Global/Database/penaltyDB/cezapuan")
const penalty =require("../../../../Global/Database/penaltyDB/penaltys")
// Günlük-Haftalık-Aylık Verileri Message Userden çekiyorum.
const messageUser = require("../../../../Global/Database/Stats/Message/messageUser")
const messageUserChannel = require("../../../../Global/Database/Stats/Message/messageUserChannel");

const voiceUser = require("../../../../Global/Database/Stats/Voice/voiceUser");
const voiceUserChannel = require("../../../../Global/Database/Stats/Voice/voiceUserChannel")
const userParent = require("../../../../Global/Database/Stats/Voice/voiceUserParent")
const joinedAt = require("../../../../Global/Database/Stats/Voice/voiceJoinedAt")

const cameraOpenedAt = require("../../../../Global/Database/Stats/Camera/cameraOpenedAt");
const voiceCameraUser = require("../../../../Global/Database/Stats/Camera/voiceCameraUser");
const voiceGuildCamera = require('../../../../Global/Database/Stats/Camera/voiceGuildCamera');
const voiceGuildCameraChannel = require('../../../../Global/Database/Stats/Camera/voiceGuildCameraChannel');
const voiceGuildCameraUserChannel = require('../../../../Global/Database/Stats/Camera/voiceGuildCameraUserChannel');

const streamOpenedAt = require("../../../../Global/Database/Stats/Streamer/streamOpenedAt");
const voiceStreamerUser = require("../../../../Global/Database/Stats/Streamer/voiceStreamerUser");
const voiceGuildStream = require('../../../../Global/Database/Stats/Streamer/voiceGuildStream');
const voiceGuildStreamChannel = require('../../../../Global/Database/Stats/Streamer/voiceGuildStreamChannel');
const voiceGuildStreamUserChannel = require('../../../../Global/Database/Stats/Streamer/voiceGuildStreamUserChannel');

require("moment-duration-format");
class Stats extends Command {
    constructor(client) {
        super(client, {
            name: "Stat",
            description: "Kişinin sunucu içerisindeki istatistik bilgilerini gösterir.",
            usage: ".stat (@Lulu/ID)",
            category: "İstatistik",
            aliases: ["stat","Stats","lulu"],
            enabled: true,
        });
    }
 async onRequest (client, message, args,embed) {
    const statsystemCollect = await statSystemDB.findOne({guildID:message.guild.id});
    let controlsystem = statsystemCollect ? statsystemCollect.statSystem : false;
    if(controlsystem == true) {
  if(message) await message.react(await emojiBul("appEmoji_tik","id")).catch(undefined)

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
    var kategoriler = [];
    message.guild.channels.cache.filter(x=> x.parentId).forEach(channel => {
      if(channel.type == 2){
      if(!kategoriler.includes(channel.parentId)){
        kategoriler.push(channel.parentId)
      }
      }});
    var kategorilermsg =[];
    await kategoriler.filter(x=> message.guild.channels.cache.get(x)).sort((a,b) => message.guild.channels.cache.get(a).rawPosition - message.guild.channels.cache.get(b).rawPosition).forEach(async x=>{
     if(message.guild.channels.cache.get(x)) await kategoriStatToplam(x,message.guild,member) != false ? await kategorilermsg.push(`${message.guild.emojis.cache.find(x=> x.name == "appEmoji_kategori") ? `${message.guild.emojis.cache.find(x=> x.name == "appEmoji_kategori")}`: `\` | \` `} **${message.guild.channels.cache.get(x).name}** : \`${await kategoriStatToplam(x,message.guild,member)}\``) : ``;
    await kategorilermsg;
     });
    const memberMessageData = await messageUserChannel.find({ guildID: message.guild.id, userID: member.id }).sort({ channelData: -1 });
    const memberVoiceData = await voiceUserChannel.find({ guildID: message.guild.id, userID: member.id }).sort({ channelData: -1 });
    let messageTop = memberMessageData.length > 0 ? memberMessageData.splice(0, 5).filter(x => message.guild.channels.cache.has(x.channelID)).map((x,index) => `${message.guild.emojis.cache.find(x=> x.name == "nokta2") ? `${message.guild.emojis.cache.find(x=> x.name == "nokta2")}` : "•"} <#${x.channelID}>: \` ${Number(x.channelData).toLocaleString()} mesaj \``).join("\n") : "Veri bulunmuyor."
    let voiceTop = memberVoiceData.length > 0 ? memberVoiceData.splice(0, 5).filter(x => message.guild.channels.cache.has(x.channelID)).map((x,index) => `${message.guild.emojis.cache.find(x=> x.name == "nokta2") ? `${message.guild.emojis.cache.find(x=> x.name == "nokta2")}` : "•"} <#${x.channelID}>: \` ${moment.duration(x.channelData).format("H [saat], m [dakika]")} \``).join("\n") : "Veri bulunmuyor."
    const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.id });
    const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.id });
    const voiceStreamData = await voiceStreamerUser.findOne({guildID:message.guild.id,userID:member.id})
    var voiceStream = voiceStreamData ? voiceStreamData.totalStat : 0;
    var voiceStreamtwo = voiceStreamData ? voiceStreamData.twoWeeklyStat : 0;
    var voiceStreamone = voiceStreamData ? voiceStreamData.weeklyStat : 0;
    var voiceStreamdaily = voiceStreamData ? voiceStreamData.totalStat : 0;

    const voiceCameraData = await voiceCameraUser.findOne({guildID:message.guild.id,userID:member.id})
    var voiceCamera = voiceCameraData ? voiceCameraData.totalStat : 0;
    var voiceCameraTwoWeekly = voiceCameraData ? voiceCameraData.twoWeeklyStat : 0;
    var voiceCameraWeekly = voiceCameraData ? voiceCameraData.weeklyStat : 0;
    var voiceCameraDaily = voiceCameraData ? voiceCameraData.dailyStat : 0;
    
    let joinedAtData = await joinedAt.findOne({ userID: member.id });
    let kup = message.guild.emojis.cache.find(x=> x.name == "appEmoji_kup") ? message.guild.emojis.cache.find(x=> x.name == "appEmoji_kup") : "❯"
    let saat = message.guild.emojis.cache.find(x=> x.name == "appEmoji_saat") ? `${message.guild.emojis.cache.find(x=> x.name == "appEmoji_saat")}`: `\` | \` `;
    var a = 0;
    if(joinedAtData){
      a = Date.now() - joinedAtData.date;
    };

    let platform = { web: '🌍', desktop: '💻', mobile: '📱' }
    let bilgi;
    if(member.presence && member.presence.status !== 'offline') { bilgi = `${platform[Object.keys(member.presence.clientStatus)[0]]}` } else { bilgi = '🔴' }

    let cihaz;
    let gunluk;
    let haftalık;
    let aylık;
    let genel;

    let rowb = new ActionRowBuilder()
    .setComponents(
    genel   = new ButtonBuilder().setCustomId("genel").setLabel("Genel").setStyle(ButtonStyle.Primary).setDisabled(false),
    aylık   = new ButtonBuilder().setCustomId("aylık").setLabel("Aylık").setStyle(ButtonStyle.Primary).setDisabled(false),
    haftalık= new ButtonBuilder().setCustomId("haftalık").setLabel("Haftalık").setStyle(ButtonStyle.Primary).setDisabled(false),
    gunluk  = new ButtonBuilder().setCustomId("gunluk").setLabel("Günlük").setStyle(ButtonStyle.Primary).setDisabled(false),
    cihaz  = new ButtonBuilder().setCustomId("cihaz").setLabel(bilgi).setStyle(ButtonStyle.Secondary).setDisabled(true),
    )

    const row = new ActionRowBuilder()
    .setComponents(
    new StringSelectMenuBuilder()
    .setCustomId("istatistik")
    .setPlaceholder("İstatistik Detaylarınızı Görüntüleyin.")
    .setOptions(
      [
        {label:"Genel",description:"Tüm İstatistiklerinizi Gösterir.",value:"genel2"},
        {label:"Ceza",description:"Ceza İstatistiklerinizi Gösterir.",value:"ceza"},
        {label:"Profil",description:"Profilini gösterir.",value:"profil"}
        
      ]
    )
    )
    let e;
    let r ;
       await message.channel.send( {components:[r =row, rowb], embeds:[e =new EmbedBuilder().setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
        .setColor("2F3136")
        .setDescription(`${message.guild.emojis.cache.find(x=> x.name == "star") ? `${message.guild.emojis.cache.find(x=> x.name == "star")}` : "•"} ${member} [<@&${member.roles.highest.id}>] Üyesinin <t:${Math.floor(Math.floor(Date.now()) / 1000)}:R> tarihinden  itibaren **${message.guild.name}** sunucusunda istatislik bilgileri aşağıda belirtilmiştir.`).addFields(
            {name:`Toplam Mesaj`, value: `${Formatters.codeBlock("fix", `${Number(messageData ? messageData.totalStat : 0).toLocaleString()} Mesaj`)}`, inline:true},
            {name:`Toplam Ses`, value: `${Formatters.codeBlock("fix",moment.duration(voiceData ? voiceData.totalStat+a : 0).format("H [Saat], m [dakika]"))}`, inline:true},
            {name:`Toplam Kamera`, value: `${Formatters.codeBlock("fix",moment.duration(voiceCamera).format("H [Saat], m [dakika]"))}`, inline:true},   
            {name:`__**Ses Kanal Sıralaması:**__`, value:voiceTop,inline:false},
            {name:`__**Mesaj Kanal Sıralaması:**__`, value:messageTop,inline:false},
          )] }).then(msg=> {
            
    var filter = (button) => button.user.id === message.author.id;    
    const collector = msg.createMessageComponentCollector({ filter, time: 90000 });
    collector.on('collect', async (inter) => {
    await inter.deferUpdate();
    const menu = inter.values ? inter.values[0] : "Yok";
    const button = inter.customId;
    if(menu == "genel2"){
        let G1 = messageData ? messageData.totalStat : 0;
        let G2 = voiceData ? ((voiceData.totalStat+a)/60000).toFixed() : 0
        let G3 = voiceData ? ((voiceStream)/60000).toFixed() : 0
        let G4 = voiceData ? ((voiceCamera)/60000).toFixed() : 0
  
        const ChartJsImage = require('chartjs-to-image');
        const myChart = new ChartJsImage();
        myChart.setConfig({ type: 'bar',
        data: {
            labels: ["Mesaj","Ses","Yayın","Kamera"],
            datasets: [
              {
                  label: "İstatistik",
                  backgroundColor: "#5865f2",
                  fill: true,
                  data: [G1, G2, G3, G4],
              },
          ]
      },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
        });
  
      myChart.setWidth(500).setHeight(300).setBackgroundColor('transparent');
      const dataUrl = await myChart.getShortUrl()
  
      await msg.edit({
          components:[row, new ActionRowBuilder({components:[genel.setDisabled(true),aylık.setDisabled(false),haftalık.setDisabled(false),gunluk.setDisabled(false)]})],
          files:[ new AttachmentBuilder().setFile(dataUrl).setName("stat.png")],
          embeds:[
          new EmbedBuilder()
          .setColor("2F3136")
          .setImage("attachment://stat.png")
          .setDescription(`${message.guild.emojis.cache.find(x=> x.name == "star") ? `${message.guild.emojis.cache.find(x=> x.name == "star")}` : "•"} ${member} [<@&${member.roles.highest.id}>] Üyesinin <t:${Math.floor(Math.floor(Date.now()) / 1000)}:R> tarihinden  itibaren **${message.guild.name}** sunucusunda genel istatislik bilgileri aşağıda belirtilmiştir.`).addFields(
              {name:`Toplam Mesaj`, value: `${Formatters.codeBlock("fix", `${Number(messageData ? messageData.totalStat : 0).toLocaleString()} Mesaj`)}`, inline:true},
              {name:`Toplam Ses`, value: `${Formatters.codeBlock("fix",moment.duration(voiceData ? voiceData.totalStat+a : 0).format("H [Saat], m [dakika]"))}`, inline:true},
              {name:`Toplam Kamera`, value: `${Formatters.codeBlock("fix",moment.duration(voiceCamera).format("H [Saat], m [dakika]"))}`, inline:true}, 
                 
      )
          ]
      })
        }
        if(menu == "profil"){

    // Profil
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
     let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
     let cezapuandata = await cezapuan.findOne({guildID:message.guild.id,userID:member.id});
     let nickname = member.displayName == user.username ? "" + user.username + " [Yok] " : member.displayName
     let platform = { web: '` İnternet Tarayıcısı ` ` 🌍 `', desktop: '` PC (App) ` ` 💻 `', mobile: '` Mobil ` ` 📱 `' }
     let bilgi;
     let uyesesdurum; 
     const roles = user.roles.cache.filter(role => role.id !== message.guild.id).sort((a, b) => b.position - a.position).map(role => `<@&${role.id}>`);
     const rolleri = [];
     if (roles.length > 6) {
         const lent = roles.length - 6;
         let itemler = roles.slice(0, 6);
         itemler.map(x => rolleri.push(x));
         rolleri.push(`${lent}...`);
     } else {
         roles.map(x => rolleri.push(x));
     };
    if(user.presence && user.presence.status !== 'offline') { bilgi = `• Bağlandığı Cihaz: ${platform[Object.keys(user.presence.clientStatus)[0]]}` } else { bilgi = '` • ` Bağlandığı Cihaz: Çevrimdışı `🔴`' }
   // Spotify
    let Activity = member.presence.activities;
    var SpotifyActivity;
    Activity.forEach(Activity => {
      if (Activity.name == "Spotify" && Activity.type == 2) SpotifyActivity = Activity;
    });

    if (member.presence.activities.length === 0 || !SpotifyActivity) {
        return msg.edit({
            components:[row, new ActionRowBuilder({components:[genel.setDisabled(false),aylık.setDisabled(false),haftalık.setDisabled(false),gunluk.setDisabled(false)]})],
            embeds:[
            new EmbedBuilder()
            .setColor("2F3136")
            .setDescription(`${message.guild.emojis.cache.find(x=> x.name == "star") ? `${message.guild.emojis.cache.find(x=> x.name == "star")}` : "•"} ${member} [<@&${member.roles.highest.id}>] Üyesinin profil bilgileri aşağıda belirtilmiştir.`).addFields(
           {name:`**Kullanıcı Bilgi:**`, value: `
          •  Profil: ${user}
          • ID: \` ${user.id} \`
           ${bilgi}
          • Oluşturulma Tarihi: <t:${Number(String(Date.parse(user.user.createdAt)).substring(0, 10))}:D> [<t:${Number(String(Date.parse(user.user.createdAt)).substring(0, 10))}:R>]

           **Sunucu Bilgisi:**
          • Sunucu İsmi: \` ${nickname} \`
          • Ceza Puanı: \` ${cezapuandata ? cezapuandata.cezapuan : 0} \`
          • Katılma Tarihi: <t:${Number(String(Date.parse(user.joinedAt)).substring(0, 10))}:R>
          • Katılım Sırası: \` ${(message.guild.members.cache.filter(a => a.joinedTimestamp <=user.joinedTimestamp).size).toLocaleString()}/${(message.guild.memberCount).toLocaleString()} \`
          • Rolleri (\` ${rolleri.length} \`): ${rolleri.join(", ")}
           
          ** Spotify: **
          Şuan Spotify'da herhangi bir şarkı dinlemiyorsun.
           
           `, inline:true},
        )
            ]
        })
    }

    member.presence.activities.forEach(activity => {
      if (activity.type === 2 && activity.name === "Spotify") {

        let image = `https://i.scdn.co/image/${activity.assets.largeImage.slice(
          8
        )}`;
       const card = new canvacord.Spotify()
          .setAuthor(activity.state)
          .setAlbum(activity.assets.largeText)
          .setStartTimestamp(activity.timestamps.start)
          .setEndTimestamp(activity.timestamps.end)
          .setImage(image)
          .setBackground("COLOR", "#06050c")
          .setTitle(activity.details);
        card.build().then(Card => {
        const file = new Discord.AttachmentBuilder(Card, { name: "SpotifyCard.png" })
        return msg.edit({
              components:[row, new ActionRowBuilder({components:[genel.setDisabled(true),aylık.setDisabled(false),haftalık.setDisabled(false),gunluk.setDisabled(false)]})],
              files:[file],
              embeds:[
              new EmbedBuilder()
              .setColor("2F3136")
              .setImage('attachment://SpotifyCard.png')
              .setDescription(`${message.guild.emojis.cache.find(x=> x.name == "star") ? `${message.guild.emojis.cache.find(x=> x.name == "star")}` : "•"} ${member} [<@&${member.roles.highest.id}>] Üyesinin profil bilgileri aşağıda belirtilmiştir.`).addFields(
             {name:`**Kullanıcı Bilgi:**`, value: `
            •  Profil: ${user}
            • ID: \` ${user.id} \`
             ${bilgi}
            • Oluşturulma Tarihi: <t:${Number(String(Date.parse(user.user.createdAt)).substring(0, 10))}:D> [<t:${Number(String(Date.parse(user.user.createdAt)).substring(0, 10))}:R>]

             **Sunucu Bilgisi:**
            • Sunucu İsmi: \` ${nickname} \`
            • Ceza Puanı: \` ${cezapuandata ? cezapuandata.cezapuan : 0} \`
            • Katılma Tarihi: <t:${Number(String(Date.parse(user.joinedAt)).substring(0, 10))}:R>
            • Katılım Sırası: \` ${(message.guild.members.cache.filter(a => a.joinedTimestamp <=user.joinedTimestamp).size).toLocaleString()}/${(message.guild.memberCount).toLocaleString()} \`
            • Rolleri (\` ${rolleri.length} \`): ${rolleri.join(", ")}
             
            ** Spotify: **
             
             `, inline:true},
          )
              ]
          })})
        }
    })
        }
        if(menu == "ceza"){
            let data = await penalty.find({guildID:message.guild.id,userID:member.id})
            let cezapuandata = await cezapuan.findOne({guildID:message.guild.id,userID:member.id})
            const cp = cezapuandata ? cezapuandata.cezapuan: 0;
            var ban = 0;
            var cmute = 0;
            var vmute =0;
            var jail = 0;
            for (let i = 0; i < data.length; i++) {
                const cezalar = data[i];
                if(cezalar.penaltys[0].type == "CHAT-MUTE"){cmute++}
                else if(cezalar.penaltys[0].type == "VOICE-MUTE"){vmute++}
                else if(cezalar.penaltys[0].type == "JAIL"){jail++}
                else if(cezalar.penaltys[0].type == "BAN"){ban++}
            }

            let G1 = cmute
            let G2 = vmute
            let G3 = jail
            let G4 = ban
      
            const ChartJsImage = require('chartjs-to-image');
            const myChart = new ChartJsImage();
            myChart.setConfig({ type: 'bar',
            data: {
                labels: ["Mute","Vmute","Jail","Ban"],
                datasets: [
                  {
                      label: "Ceza İstatistik",
                      backgroundColor: "#5865f2",
                      fill: true,
                      data: [G1, G2, G3, G4],
                  },
              ]
          },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
            });
      
          myChart.setWidth(500).setHeight(300).setBackgroundColor('transparent');
          const dataUrl = await myChart.getShortUrl()
      
          await msg.edit({
              components:[row, new ActionRowBuilder({components:[genel.setDisabled(true),aylık.setDisabled(false),haftalık.setDisabled(false),gunluk.setDisabled(false)]})],
              files:[ new AttachmentBuilder().setFile(dataUrl).setName("stat.png")],
              embeds:[
              new EmbedBuilder()
              .setColor("2F3136")
              .setImage("attachment://stat.png")
              .setDescription(`${message.guild.emojis.cache.find(x=> x.name == "star") ? `${message.guild.emojis.cache.find(x=> x.name == "star")}` : "•"} ${member} [<@&${member.roles.highest.id}>] Üyesinin <t:${Math.floor(Math.floor(Date.now()) / 1000)}:R> tarihinden  itibaren **${message.guild.name}** sunucusunda genel ceza istatislik bilgileri aşağıda belirtilmiştir.\n\nToplamda \`${ban+cmute+vmute+jail}\` (**Mute: ${cmute} | VMute: ${vmute} | Jail: ${jail} | Ban: ${ban}**) adet ihlali\n\`${cp}\` ceza puanı bulundu.`)
              ]
          })
            }
    if(button == "genel"){
      let G1 = messageData ? messageData.totalStat : 0;
      let G2 = voiceData ? ((voiceData.totalStat+a)/60000).toFixed() : 0
      let G3 = voiceData ? ((voiceStream)/60000).toFixed() : 0
      let G4 = voiceData ? ((voiceCamera)/60000).toFixed() : 0

      const ChartJsImage = require('chartjs-to-image');
      const myChart = new ChartJsImage();
      myChart.setConfig({ type: 'bar',
      data: {
          labels: ["Mesaj","Ses","Yayın","Kamera"],
          datasets: [
            {
                label: "İstatistik",
                backgroundColor: "#5865f2",
                fill: true,
                data: [G1, G2, G3, G4],
            },
        ]
    },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
      });

    myChart.setWidth(500).setHeight(300).setBackgroundColor('transparent');
    const dataUrl = await myChart.getShortUrl()

    await msg.edit({
        components:[row, new ActionRowBuilder({components:[genel.setDisabled(true),aylık.setDisabled(false),haftalık.setDisabled(false),gunluk.setDisabled(false)]})],
        files:[ new AttachmentBuilder().setFile(dataUrl).setName("stat.png")],
        embeds:[
        new EmbedBuilder()
        .setColor("2F3136")
        .setImage("attachment://stat.png")
        .setDescription(`${message.guild.emojis.cache.find(x=> x.name == "star") ? `${message.guild.emojis.cache.find(x=> x.name == "star")}` : "•"} ${member} [<@&${member.roles.highest.id}>] Üyesinin <t:${Math.floor(Math.floor(Date.now()) / 1000)}:R> tarihinden  itibaren **${message.guild.name}** sunucusunda genel istatislik bilgileri aşağıda belirtilmiştir.`).addFields(
            {name:`Toplam Mesaj`, value: `${Formatters.codeBlock("fix", `${Number(messageData ? messageData.totalStat : 0).toLocaleString()} Mesaj`)}`, inline:true},
            {name:`Toplam Ses`, value: `${Formatters.codeBlock("fix",moment.duration(voiceData ? voiceData.totalStat+a : 0).format("H [Saat], m [dakika]"))}`, inline:true},
            {name:`Toplam Kamera`, value: `${Formatters.codeBlock("fix",moment.duration(voiceCamera).format("H [Saat], m [dakika]"))}`, inline:true}, 
               
    )
        ]
    })
    }
    if(button == "aylık"){
      let A1 = messageData ? messageData.twoWeeklyStat : 0;
      let A2 = voiceData ? ((voiceData.twoWeeklyStat+a)/60000).toFixed() : 0
      let A3 = voiceData ? ((voiceStreamtwo)/60000).toFixed() : 0
      let A4 = voiceData ? ((voiceCameraTwoWeekly)/60000).toFixed() : 0 

      const ChartJsImage = require('chartjs-to-image');
      const myChart = new ChartJsImage();
      myChart.setConfig({ type: 'bar',
      data: {
          labels: ["Mesaj","Ses","Yayın","Kamera"],
          datasets: [
            {
                label: "İstatistik",
                backgroundColor: "#5865f2",
                fill: true,
                data: [A1, A2, A3, A4],
            },
        ]
    },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
      });

    myChart.setWidth(500).setHeight(300).setBackgroundColor('transparent');
    const dataUrl = await myChart.getShortUrl()

        await msg.edit({
            components:[row, new ActionRowBuilder({components:[genel.setDisabled(false),aylık.setDisabled(true),haftalık.setDisabled(false),gunluk.setDisabled(false)]})],
            files:[ new AttachmentBuilder().setFile(dataUrl).setName("stat.png")],
            embeds:[
            new EmbedBuilder()
            .setColor("2F3136")
            .setImage("attachment://stat.png")
            .setDescription(`${message.guild.emojis.cache.find(x=> x.name == "star") ? `${message.guild.emojis.cache.find(x=> x.name == "star")}` : "•"} ${member} [<@&${member.roles.highest.id}>] Üyesinin <t:${Math.floor(Math.floor(Date.now()) / 1000)}:R> tarihinden  itibaren **${message.guild.name}** sunucusunda aylık istatislik bilgileri aşağıda belirtilmiştir.`).addFields(
                {name:`Aylık Mesaj`, value: `${Formatters.codeBlock("fix", `${Number(messageData ? messageData.twoWeeklyStat : 0).toLocaleString()} Mesaj`)}`, inline:true},
                {name:`Aylık Ses`, value: `${Formatters.codeBlock("fix",moment.duration(voiceData ? voiceData.twoWeeklyStat+a : 0).format("H [Saat], m [dakika]"))}`, inline:true},
                {name:`Aylık Kamera`, value: `${Formatters.codeBlock("fix",moment.duration(voiceCameraTwoWeekly).format("H [Saat], m [dakika]"))}`, inline:true},
            
              
        )]})}

        if(button == "haftalık"){
          let H1 = messageData ? messageData.weeklyStat : 0;
          let H2 = voiceData ? ((voiceData.weeklyStat+a)/60000).toFixed() : 0
          let H3 = voiceData ? ((voiceStreamone)/60000).toFixed() : 0 
          let H4 = voiceData ? ((voiceCameraWeekly)/60000).toFixed() : 0

          const ChartJsImage = require('chartjs-to-image');
          const myChart = new ChartJsImage();
          myChart.setConfig({ type: 'bar',
          data: {
              labels: ["Mesaj","Ses","Yayın","Kamera"],
              datasets: [
                {
                    label: "İstatistik",
                    backgroundColor: "#5865f2",
                    fill: true,
                    data: [H1, H2, H3, H4],
                },
            ]
        },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      }
                  }]
              }
          }
          });

        myChart.setWidth(500).setHeight(300).setBackgroundColor('transparent');
        const dataUrl = await myChart.getShortUrl()

        await msg.edit({
              components:[row, new ActionRowBuilder({components:[genel.setDisabled(false),aylık.setDisabled(false),haftalık.setDisabled(true),gunluk.setDisabled(false)]})],
              files:[ new AttachmentBuilder().setFile(dataUrl).setName("stat.png")],
              embeds:[
              new EmbedBuilder()
              .setColor("2F3136")
              .setImage("attachment://stat.png")
              .setDescription(`${message.guild.emojis.cache.find(x=> x.name == "star") ? `${message.guild.emojis.cache.find(x=> x.name == "star")}` : "•"} ${member} [<@&${member.roles.highest.id}>] Üyesinin <t:${Math.floor(Math.floor(Date.now()) / 1000)}:R> tarihinden  itibaren **${message.guild.name}** sunucusunda haftalık istatislik bilgileri aşağıda belirtilmiştir.`).addFields(
                  {name:`Haftalık Mesaj`, value: `${Formatters.codeBlock("fix", `${Number(messageData ? messageData.weeklyStat : 0).toLocaleString()} Mesaj`)}`, inline:true},
                  {name:`Haftalık Ses`, value: `${Formatters.codeBlock("fix",moment.duration(voiceData ? voiceData.weeklyStat+a : 0).format("H [Saat], m [dakika]"))}`, inline:true},
                  {name:`Haftalık Kamera`, value: `${Formatters.codeBlock("fix",moment.duration(voiceCameraWeekly).format("H [Saat], m [dakika]"))}`, inline:true},
        
   
          )]})}
          

          if(button == "gunluk"){
            let G1 = messageData ? messageData.dailyStat : 0;
            let G2 = voiceData ? ((voiceData.dailyStat+a)/60000).toFixed() : 0
            let G3 = voiceData ? ((voiceStreamdaily)/60000).toFixed() : 0 
            let G4 = voiceData ? ((voiceCameraDaily)/60000).toFixed() : 0
  
            const ChartJsImage = require('chartjs-to-image');
            const myChart = new ChartJsImage();
            myChart.setConfig({ type: 'bar',
            data: {
                labels: ["Mesaj","Ses","Yayın","Kamera"],
                datasets: [
                  {
                      label: "İstatistik",
                      backgroundColor: "#5865f2",
                      fill: true,
                      data: [G1, G2, G3, G4],
                  },
              ]
          },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
            });
  
          myChart.setWidth(500).setHeight(300).setBackgroundColor('transparent');
          const dataUrl = await myChart.getShortUrl()
            await msg.edit({
                components:[row, new ActionRowBuilder({components:[genel.setDisabled(false),aylık.setDisabled(false),haftalık.setDisabled(false),gunluk.setDisabled(true)]})],
                files:[ new AttachmentBuilder().setFile(dataUrl).setName("stat.png")],
                embeds:[
                new EmbedBuilder()
                .setColor("2F3136")
                .setImage("attachment://stat.png")
                .setDescription(`${message.guild.emojis.cache.find(x=> x.name == "star") ? `${message.guild.emojis.cache.find(x=> x.name == "star")}` : "•"} ${member} [<@&${member.roles.highest.id}>] Üyesinin <t:${Math.floor(Math.floor(Date.now()) / 1000)}:R> tarihinden  itibaren **${message.guild.name}** sunucusunda günlük istatislik bilgileri aşağıda belirtilmiştir.`).addFields(
                    {name:`Günlük Mesaj`, value: `${Formatters.codeBlock("fix", `${Number(messageData ? messageData.dailyStat : 0).toLocaleString()} Mesaj`)}`, inline:true},
                    {name:`Günlük Ses`, value: `${Formatters.codeBlock("fix",moment.duration(voiceData ? voiceData.dailyStat+a : 0).format("H [Saat], m [dakika]"))}`, inline:true},
                    {name:`Günlük Kamera`, value: `${Formatters.codeBlock("fix",moment.duration(voiceCameraDaily).format("H [Saat], m [dakika]"))}`, inline:true},
                  
                  
            )]})}
            
    })})
}else  return cevap(message,"sistemKapali");

 }
}


async function kategoriStatToplam(parentsArray, guild, author) {
    const data = await userParent.find({ guildID: guild.id, userID: author.id });
    const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
    let voiceStat = 0;
    for (var i = 0; i <= voiceUserParentData.length; i++) {
      voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
    }
    if(voiceStat == 0) return false;
    else return moment.duration(voiceStat).format("H [saat], m [dakika]");
  }
module.exports = Stats;