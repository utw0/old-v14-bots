const { Event } = require("../../../../Global/Structures/Default.Events");
const chalk = require('chalk')
const {Guild} = require("../../../../Global/Config/Guild")
const { CronJob } = require("cron");
const {Collection} = require("discord.js")
const messageUser = require("../../../../Global/Database/Stats/Message/messageUser")
const messageGuild = require("../../../../Global/Database/Stats/Message/messageGuild")
const voiceUser = require("../../../../Global/Database/Stats/Voice/voiceUser");
const voiceGuild = require("../../../../Global/Database/Stats/Voice/voiceGuild");
const voiceGuildCamera = require("../../../../Global/Database/Stats/Camera/voiceGuildCamera");
const voiceGuildStream = require("../../../../Global/Database/Stats/Streamer/voiceGuildStream");
const voiceCameraUser = require("../../../../Global/Database/Stats/Camera/voiceCameraUser");
const voiceStreamerUser = require("../../../../Global/Database/Stats/Streamer/voiceStreamerUser");
const momen = require("moment")
require("moment-timezone")
require("moment-duration-format")
class statReset extends Event {
    constructor(client) {
        super(client, {
            name: "ready",
            enabled: true,
        });    
    }    

 async   onLoad() {
const guild = client.guilds.cache.get(Guild.ID)
const channel = guild.channels.cache.find(x=> x.name == "stats-log");
 new CronJob("00 00 * * *", async () => {
   await messageGuild.findOneAndUpdate({ guildID:Guild.ID }, { $set: { dailyStat: 0 } });
   await voiceGuild.findOneAndUpdate({ guildID: Guild.ID }, { $set: { dailyStat: 0 } });
   await voiceGuildCamera.findOneAndUpdate({ guildID: Guild.ID }, { $set: { dailyStat: 0 } });
   await voiceGuildStream.findOneAndUpdate({ guildID: Guild.ID }, { $set: { dailyStat: 0 } });
   await voiceStreamerUser.find({ guildID: Guild.ID }, (err, data) => {
    data.forEach((veri) => {
     veri.dailyStat = 0;
      veri.save()
     });
  });
   await voiceCameraUser.find({ guildID: Guild.ID }, (err, data) => {
    data.forEach((veri) => {
     veri.dailyStat = 0;
      veri.save()
     });
  });
   await messageUser.find({ guildID: Guild.ID }, (err, data) => {
     data.forEach((veri) => {
      veri.dailyStat = 0;
       veri.save()
      });
   });
   await voiceUser.find({ guildID: Guild.ID }, (err, data) => {
     data.forEach((veri) => {
       veri.dailyStat = 0
       veri.save()
     });
   });
if(channel) await channel.send({content:`** __Günlük__ istatistikler sıfırlandı.\nTarih: \`${new Date(Date.now()).toTurkishFormatDate()}\`**`})
 }, null, true, "Europe/Istanbul").start();

 new CronJob("00 00 * * 00", async () => {
   await messageGuild.findOneAndUpdate({ guildID: Guild.ID }, { $set: { weeklyStat: 0 } });
   await voiceGuild.findOneAndUpdate({ guildID: Guild.ID }, { $set: { weeklyStat: 0 } });
   await voiceGuildCamera.findOneAndUpdate({ guildID: Guild.ID }, { $set: { weeklyStat: 0 } });
   await voiceGuildStream.findOneAndUpdate({ guildID: Guild.ID }, { $set: { weeklyStat: 0 } });
   await voiceStreamerUser.find({ guildID: Guild.ID }, (err, data) => {
    data.forEach((veri) => {
      veri.weeklyStat = 0
      veri.save()
    });
  });
  await voiceCameraUser.find({ guildID: Guild.ID }, (err, data) => {
    data.forEach((veri) => {
      veri.weeklyStat = 0
      veri.save()
    });
  });
   await messageUser.find({ guildID: Guild.ID }, (err, data) => {
     data.forEach((veri) => {
       veri.weeklyStat = 0
       veri.save()
     });
   });
   await voiceUser.find({ guildID: Guild.ID }, (err, data) => {
     data.forEach((veri) => {
       veri.weeklyStat = 0
       veri.save()
     });

   });
   if(channel) await channel.send({content:`** __Haftalık__ istatistikler sıfırlandı.\nTarih: \`${new Date(Date.now()).toTurkishFormatDate()}\`**`})

 }, null, true, "Europe/Istanbul").start();
 new CronJob("* * 01 * *", async () => {
  await messageGuild.findOneAndUpdate({ guildID: Guild.ID }, { $set: { twoWeeklyStat: 0 } });
  await voiceGuild.findOneAndUpdate({ guildID: Guild.ID }, { $set: { twoWeeklyStat: 0 } });
  await voiceGuildCamera.findOneAndUpdate({ guildID: Guild.ID }, { $set: { twoWeeklyStat: 0 } });
  await voiceGuildStream.findOneAndUpdate({ guildID: Guild.ID }, { $set: { twoWeeklyStat: 0 } });
  await voiceStreamerUser.find({ guildID: Guild.ID }, (err, data) => {
   data.forEach((veri) => {
     veri.twoWeeklyStat = 0
     veri.save()
   });
 });
 await voiceCameraUser.find({ guildID: Guild.ID }, (err, data) => {
   data.forEach((veri) => {
     veri.twoWeeklyStat = 0
     veri.save()
   });
 });
  await messageUser.find({ guildID: Guild.ID }, (err, data) => {
    data.forEach((veri) => {
      veri.twoWeeklyStat = 0
      veri.save()
    });
  });
  await voiceUser.find({ guildID: Guild.ID }, (err, data) => {
    data.forEach((veri) => {
      veri.twoWeeklyStat = 0
      veri.save()
    });
  });
if(channel) await channel.send({content:`** __Aylık__ istatistikler sıfırlandı.\nTarih: \`${new Date(Date.now()).toTurkishFormatDate()}\`**`})
}, null, true, "Europe/Istanbul").start();

    }
}    
module.exports = statReset;
