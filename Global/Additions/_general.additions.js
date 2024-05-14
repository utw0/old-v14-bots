const moment = global.moment = require('moment');
require("moment-duration-format");
require("moment-timezone");
const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder,PermissionsBitField,Intents,WebhookClient } = require('discord.js');
const query = require("./Distributors")
const GUILD_ROLES = require("../Database/Backup/Guild.Roles");
const GUILD_CATEGORY = require("../Database/Backup/Guild.Category.Channels");
const GUILD_TEXT = require("../Database/Backup/Guild.Text.Channels");
const GUILD_VOICE = require("../Database/Backup/Guild.Voice.Channels");
const Distributors = global.Distributors = [];
const axios = require("axios");
const Guild = require('../Config/Guild');
const missionSystem = require('../Database/SystemDB/mission.system');
const autostaff = require('../Database/SystemDB/guild.auto.staff');
const guard = require("../Database/Guard");
const voiceUser = require('../Database/Stats/Voice/voiceUser');
const voiceGuild = require('../Database/Stats/Voice/voiceGuild');
const voiceGuildChannel = require('../Database/Stats/Voice/voiceGuildChannel');
const voiceUserChannel = require('../Database/Stats/Voice/voiceUserChannel');
const voiceUserParent = require('../Database/Stats/Voice/voiceUserParent');
const voiceCameraUser = require('../Database/Stats/Camera/voiceCameraUser');
const voiceGuildCamera = require('../Database/Stats/Camera/voiceGuildCamera');
const voiceGuildCameraChannel = require('../Database/Stats/Camera/voiceGuildCameraChannel');
const voiceGuildCameraUserChannel = require('../Database/Stats/Camera/voiceGuildCameraUserChannel');
const voiceStreamerUser = require('../Database/Stats/Streamer/voiceStreamerUser');
const voiceGuildStream = require('../Database/Stats/Streamer/voiceGuildStream');
const voiceGuildStreamChannel = require('../Database/Stats/Streamer/voiceGuildStreamChannel');
const voiceGuildStreamUserChannel = require('../Database/Stats/Streamer/voiceGuildStreamUserChannel');
const rolePermissions = require('../Database/rolePermissions');
var allBots = global.allBots = [];

let aylartoplam = { "01": "Ocak", "02": "Şubat", "03": "Mart", "04": "Nisan", "05": "Mayıs", "06": "Haziran", "07": "Temmuz", "08": "Ağustos", "09": "Eylül", "10": "Ekim", "11": "Kasım", "12": "Aralık" };
global.aylar = aylartoplam;
const voice = global.voice = require("@discordjs/voice")


const saveStats = global.saveStats = async function (type,user, channel, data) {
if(type == "voice") {
  await voiceUser.findOneAndUpdate({ guildID: user.guild.id, userID: user.id }, { $inc: { dailyStat: data, weeklyStat: data, twoWeeklyStat: data, totalStat:data} }, { upsert: true });
  await voiceGuild.findOneAndUpdate({ guildID: user.guild.id }, { $inc: { dailyStat: data, weeklyStat: data, twoWeeklyStat: data,totalStat:data } }, { upsert: true });
  await voiceGuildChannel.findOneAndUpdate({ guildID: user.guild.id}, { $inc: { channelData: data } }, { upsert: true });
  await voiceUserChannel.findOneAndUpdate({ guildID: user.guild.id, userID: user.id, channelID: channel.id }, { $inc: { channelData: data } }, { upsert: true });
  if (channel.parent) await voiceUserParent.findOneAndUpdate({ guildID: user.guild.id, userID: user.id, parentID: channel.parentId }, { $inc: { parentData: data } }, { upsert: true });
}
if(type == "camera") {
  await voiceCameraUser.findOneAndUpdate({ guildID: user.guild.id, userID: user.id }, { $inc: { dailyStat: data, weeklyStat: data, twoWeeklyStat: data, totalStat:data} }, { upsert: true });
  await voiceGuildCamera.findOneAndUpdate({ guildID: user.guild.id }, { $inc: { dailyStat: data, weeklyStat: data, twoWeeklyStat: data,totalStat:data } }, { upsert: true });
  await voiceGuildCameraChannel.findOneAndUpdate({ guildID: user.guild.id}, { $inc: { channelData: data } }, { upsert: true });
  await voiceGuildCameraUserChannel.findOneAndUpdate({ guildID: user.guild.id, userID: user.id, channelID: channel.id }, { $inc: { channelData: data } }, { upsert: true });
}
if(type == "streamer") {
  await voiceStreamerUser.findOneAndUpdate({ guildID: user.guild.id, userID: user.id }, { $inc: { dailyStat: data, weeklyStat: data, twoWeeklyStat: data, totalStat:data} }, { upsert: true });
  await voiceGuildStream.findOneAndUpdate({ guildID: user.guild.id }, { $inc: { dailyStat: data, weeklyStat: data, twoWeeklyStat: data,totalStat:data } }, { upsert: true });
  await voiceGuildStreamChannel.findOneAndUpdate({ guildID: user.guild.id}, { $inc: { channelData: data } }, { upsert: true });
  await voiceGuildStreamUserChannel.findOneAndUpdate({ guildID: user.guild.id, userID: user.id, channelID: channel.id }, { $inc: { channelData: data } }, { upsert: true });
}
}


const sureCevir = global.sureCevir = function(veri){
  return moment.duration(veri).format("H [Saat], m [dakika]");
}
const sifre = global.sifre = async function() {
  var character = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  var lengthPsw = 8;
  var randomPsw = '';
  for (var i=0; i < lengthPsw; i++) {
   var numPws = Math.floor(Math.random() * character.length);
   randomPsw += character.substring(numPws,numPws+1);
  }
  return randomPsw
 }
const tarihsel = global.tarihsel = function(tarih) {
    let tarihci = moment(tarih).tz("Europe/Istanbul").format("DD") + " " + global.aylar[moment(tarih).tz("Europe/Istanbul").format("MM")] + " " + moment(tarih).tz("Europe/Istanbul").format("YYYY")   
    return tarihci;
};

const createEnum = global.createEnum = function(keys) {
    const obj = {};
    for (const [index, key] of keys.entries()) {
      if (key === null) continue;
      obj[key] = index;
      obj[index] = key;
    }
    return obj;
}
const checkDays = global.checkDays = function(date) {
  let now = new Date();
  let diff = now.getTime() - date.getTime();
  let days = Math.floor(diff / 86400000);
  return days + (days == 1 ? " Gün" : " Gün") + " Önce";
}
const rakam = global.rakam = function(sayi,x) {
  var basamakbir = sayi.toString().replace(/ /g, "     ");
  var basamakiki = basamakbir.match(/([0-9])/g);
  basamakbir = basamakbir.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase();
  if (basamakiki) {
    basamakbir = basamakbir.replace(/([0-9])/g, d => {
      return {
        '0': x.emojis.cache.find(x=> x.name == "appEmoji_sifir") ? x.emojis.cache.find(x=> x.name == "appEmoji_sifir") : "0",
        '1': x.emojis.cache.find(x=> x.name == "appEmoji_bir") ? x.emojis.cache.find(x=> x.name == "appEmoji_bir") : "1",
        '2': x.emojis.cache.find(x=> x.name == "appEmoji_iki")? x.emojis.cache.find(x=> x.name == "appEmoji_iki") : "2",
        '3': x.emojis.cache.find(x=> x.name == "appEmoji_uc")? x.emojis.cache.find(x=> x.name == "appEmoji_uc") : "3",
        '4': x.emojis.cache.find(x=> x.name == "appEmoji_dort")? x.emojis.cache.find(x=> x.name == "appEmoji_dort") : "4",
        '5': x.emojis.cache.find(x=> x.name == "appEmoji_bes")? x.emojis.cache.find(x=> x.name == "appEmoji_bes") : "5",
        '6': x.emojis.cache.find(x=> x.name == "appEmoji_alti")? x.emojis.cache.find(x=> x.name == "appEmoji_alti") : "6",
        '7': x.emojis.cache.find(x=> x.name == "appEmoji_yedi")? x.emojis.cache.find(x=> x.name == "appEmoji_yedi") : "7",
        '8': x.emojis.cache.find(x=> x.name == "appEmoji_sekiz")? x.emojis.cache.find(x=> x.name == "appEmoji_sekiz") : "8",
        '9': x.emojis.cache.find(x=> x.name == "appEmoji_dokuz")? x.emojis.cache.find(x=> x.name == "appEmoji_dokuz") : "9",
      }
      [d];
    })
  }
  return basamakbir;
}
const sleep = global.sleep = function(ms) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + ms);
}
const timeTR = global.timeTR = function(value) {
  const days = Math.floor(value / 86400000);
  value = value % 86400000;
  const hours = Math.floor(value / 3600000);
  value = value % 3600000;
  const minutes = Math.floor(value / 60000);
  value = value % 60000;
  const seconds = Math.floor(value / 1000);
  return (days ? days + ' gün' : '') + (hours ? hours + ' saat' : '') + (minutes ? minutes + ' dakika' : '') + (seconds ? seconds + ' saniye' : '')
}
const LeaderBoard = global.LeaderBoard =async function(Guild, Channel, Voice, Message){
  const moment = require("moment");
require("moment-duration-format");
const messageGuild = require("../Database/Stats/Message/messageGuild");
const messageGuildChannel = require("../Database/Stats/Message/messageGuildChannel");
const voiceGuild = require("../Database/Stats/Voice/voiceGuild");
const voiceGuildChannel = require("../Database/Stats/Voice/voiceGuildChannel");
const messageUser = require("../Database/Stats/Message/messageUser");
const voiceUser = require("../Database/Stats/Voice/voiceUser");
const messageUsersData = await messageUser.find({ guildID: Guild.id }).sort({ twoWeeklyStat: -1 });
const voiceUsersData = await voiceUser.find({ guildID: Guild.id }).sort({ twoWeeklyStat: -1 });
const messageGuildData = await messageGuild.findOne({ guildID: Guild.id });
const voiceGuildData = await voiceGuild.findOne({ guildID: Guild.id });
const messageUsers = messageUsersData.splice(0, 20).map((x, index) => `\`${index + 1}.\` <@${x.userID}>: \`${Number(x.twoWeeklyStat).toLocaleString()} mesaj\``).join(`\n`);
const voiceUsers = voiceUsersData.filter(x=> Guild.members.cache.get(x.userID)).splice(0, 20).map((x, index) => `\`${index + 1}.\` <@${x.userID}>: \`${moment.duration(x.twoWeeklyStat).format("H [saat], m [dakika]")}\``).join(`\n`);
const mesaj = `
Toplam üye mesajları: \`${Number(messageGuildData ? messageGuildData.twoWeeklyStat : 0).toLocaleString()} mesaj\`

${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}
`

const ses = `
Toplam ses verileri: \`${moment.duration(voiceGuildData ? voiceGuildData.twoWeeklyStat : "Veri Bulunmuyor.").format("H [saat], m [dakika]")}\`

${voiceUsers.length > 0 ? voiceUsers : "Veri Bulunmuyor."}
`
  const kanal = await Guild.channels.cache.get(Channel);
  const Top1 = await kanal.messages.fetch(Voice);
  const Top2 = await kanal.messages.fetch(Message);
  if(Top1) {
    Top1.edit({embeds:[new EmbedBuilder()
      .setAuthor({name:Guild.name + " (Ses)", iconURL: Guild.iconURL()})
      .setDescription(`\`••❯\` Toplam \`${moment.duration(voiceGuildData ? voiceGuildData.twoWeeklyStat : 0).format("H [saat], m [dakika]")}\`

${voiceUsers}`)
.setFooter({text:`Güncelleme Tarihi: ${new Date(Date.now()).toTurkishFormatDate()}`,iconURL:Guild.iconURL()})
]})
  }
  if(Top2) {
    Top2.edit({embeds:[new EmbedBuilder()
      .setAuthor({name:Guild.name+ " (Mesaj)", iconURL: Guild.iconURL()})
      .setDescription(`\`••❯\` Toplam \`${Number(messageGuildData ? messageGuildData.twoWeeklyStat : 0).toLocaleString()} Mesaj\`

${messageUsers}`)
.setFooter({text:`Güncelleme Tarihi: ${new Date(Date.now()).toTurkishFormatDate()}`,iconURL:Guild.iconURL()})
]})
  }
}
const GetBanner = global.GetBanner = async function bannerURL(user, client, rep) {
  const response = await axios.get(`https://discord.com/api/v9/users/${user}`, { headers: { 'Authorization': `Bot ${client.token}` } });
  if(!response.data.banner) return rep.reply({content:"Banner Bulunamadı."}).then(x=> setTimeout(() => {x.delete()}, 5000))
  if(response.data.banner.startsWith('a_')) return `https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.gif?size=512`
  else return(`https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.png?size=512`)

}
const ytkapa = global.ytkapa = async function(guildID) {
  let sunucu = client.guilds.cache.get(guildID);
  if (!sunucu) return;
  sunucu.roles.cache.filter(r => r.editable && (r.permissions.has(PermissionsBitField.Flags.Administrator) || r.permissions.has(PermissionsBitField.Flags.ManageGuild) || r.permissions.has(PermissionsBitField.Flags.ManageRoles) || r.permissions.has(PermissionsBitField.Flags.ManageWebhooks) || r.permissions.has(PermissionsBitField.Flags.BanMembers) || r.permissions.has(PermissionsBitField.Flags.KickMembers)|| r.permissions.has(PermissionsBitField.Flags.ModerateMembers))).forEach(async r => {
    await rolePermissions.findOneAndUpdate({roleID:r.id},{$set:{BitField:new PermissionsBitField(r.permissions.bitfield)}},{upsert:true})
    await r.setPermissions(PermissionsBitField.Flags.SendMessages);
  });
}
const ytçek = global.ytçek = async function(member){
  let roller = await member.roles.cache.filter(r => r.permissions.has(PermissionsBitField.Flags.Administrator) || r.permissions.has(PermissionsBitField.Flags.ManageGuild) || r.permissions.has(PermissionsBitField.Flags.ManageRoles) || r.permissions.has(PermissionsBitField.Flags.ManageWebhooks) || r.permissions.has(PermissionsBitField.Flags.BanMembers) || r.permissions.has(PermissionsBitField.Flags.KickMembers)|| r.permissions.has(PermissionsBitField.Flags.ModerateMembers)).map(z=> z.id)
  await member.roles.remove(roller)
}
const sik = global.sik = async function(guild,kisiID, tur) {
  let uye = guild.members.cache.get(kisiID);
  if (!uye) return;
  if (tur == "am") return guild.members.ban(uye.id,{ reason: "Luppux Server Security" }).catch(err=> console.log(`${uye.user.tag} kişisini yetkim yetmediği için banlıyamadım.`));
};
const guildChannels = global.guildChannels = async function(guild) {
  if (guild) {
      const channels = []
      await guild.channels.cache.forEach(ch => {
          channels.push(ch)
      })
      for (let index = 0; index < channels.length; index++) {
          const channel = channels[index];
          let ChannelPermissions = []
          channel.permissionOverwrites.cache.forEach(perm => {
              ChannelPermissions.push({ id: perm.id, type: perm.type, allow: "" + perm.allow.bitfield, deny: "" + perm.deny.bitfield })
          });
          if ((channel.type === 0) || (channel.type === 5)) {
              await GUILD_TEXT.findOne({ channelID: channel.id }, async (err, kanalYedek) => {
                  if (!kanalYedek) {
                      const newData = new GUILD_TEXT({
                          type:0,
                          channelID: channel.id,
                          name: channel.name,
                          nsfw: channel.nsfw,
                          parentID: channel.parentId,
                          position: channel.position,
                          rateLimit: channel.rateLimitPerUser,
                          overwrites: ChannelPermissions,
                      });
                      await newData.save();
                  } else {
                      kanalYedek.name = channel.name,
                          kanalYedek.nsfw = channel.nsfw,
                          kanalYedek.parentID = channel.parentId,
                          kanalYedek.position = channel.position,
                          kanalYedek.rateLimit = channel.rateLimitPerUser,
                          kanalYedek.overwrites = ChannelPermissions
                      kanalYedek.save();
                  };
              }).catch(err => {});;
          }
          if (channel.type === 2) {
              await GUILD_VOICE.findOne({ channelID: channel.id }, async (err, kanalYedek) => {
                  if (!kanalYedek) {
                      const newData = new GUILD_VOICE({
                          type:2,
                          channelID: channel.id,
                          name: channel.name,
                          bitrate: channel.bitrate,
                          parentID: channel.parentId,
                          position: channel.position,
                          userLimit: channel.userLimit ? channel.userLimit : 0 ,
                          overwrites: ChannelPermissions,
                      });
                      await newData.save();
                  } else {
                      kanalYedek.name = channel.name,
                          kanalYedek.bitrate = channel.bitrate,
                          kanalYedek.parentID = channel.parentId,
                          kanalYedek.position = channel.position,
                          kanalYedek.userLimit = channel.userLimit ? channel.userLimit : 0,
                          kanalYedek.overwrites = ChannelPermissions
                      kanalYedek.save();
                  };
              }).catch(err => {});
          }
          if (channel.type === 4) {
              await GUILD_CATEGORY.findOne({ channelID: channel.id }, async (err, kanalYedek) => {
                  if (!kanalYedek) {
                      const newData = new GUILD_CATEGORY({
                          channelID: channel.id,
                          name: channel.name,
                          position: channel.position,
                          overwrites: ChannelPermissions,
                      });
                      await newData.save();
                  } else {
                      kanalYedek.name = channel.name,
                          kanalYedek.position = channel.position,
                          kanalYedek.overwrites = ChannelPermissions
                      kanalYedek.save();
                  };
              }).catch(err => {});;
          }
      }
      await console.log(`${tarihsel(Date.now())} tarihinde Kanal güncelleme işlemleri tamamlandı.`);
  }
}
const guildRoles = global.guildRoles = async function(guild) {
  const roles = [] 
  await guild.roles.cache.filter(r => r.name !== "@everyone").forEach(rol => {
      roles.push(rol)
  })
  
  for (let index = 0; index < roles.length; index++) {
      const role = roles[index];
      let Overwrites = [];
      await guild.channels.cache.filter(channel => channel.permissionOverwrites.cache.has(role.id)).forEach(channel => {
          let channelPerm = channel.permissionOverwrites.cache.get(role.id);
          let perms = { id: channel.id, allow: channelPerm.allow.toArray(), deny: channelPerm.deny.toArray() };
          Overwrites.push(perms);
      });
      await GUILD_ROLES.findOne({ roleID: role.id }, async (err, data) => {
          if (!data) {
              const newData = new GUILD_ROLES({
                  roleID: role.id,
                  name: role.name,
                  color: role.hexColor,
                  hoist: role.hoist,
                  position: role.position,
                  permissions: role.permissions.bitfield,
                  mentionable: role.mentionable,
                  date: Date.now(),
                  members: role.members.map(m => m.id),
                  channelOverwrites: Overwrites
              });
              newData.save();
          } else {
              data.name = role.name;
              data.color = role.hexColor;
              data.hoist = role.hoist;
              data.position = role.position;
              data.permissions = role.permissions.bitfield;
              data.mentionable = role.mentionable;
              data.date = Date.now();
              data.members = role.members.map(m => m.id);
              data.channelOverwrites = Overwrites;
              data.save();
          };
      }).catch(err => {});
  }
  await GUILD_ROLES.find({}, (err, roles) => {
      roles.filter(r => !guild.roles.cache.has(r.roleID) && Date.now() - r.date > 1000 * 60 * 60 * 24 * 3).forEach(r => {
          r.remove()
      });
  }).catch(err => {})
  await console.log(`${tarihsel(Date.now())} tarihinde Rol güncelleme işlemleri tamamlandı.`);
};
const rolKur = global.rolKur = async function(role, newRole) {
  await dataCheck(role,newRole.id,"role")
 await GUILD_ROLES.findOne({ roleID: role }, async (err, data) => {
    let length = (data.members.length + 5);
    const sayı = Math.floor(length / Distributors.length);
    if (sayı < 1) sayı = 1;
    const channelPerm = data.channelOverwrites.filter(e => newRole.guild.channels.cache.get(e.id))
    
    for await (const perm of channelPerm) {
      const guild = bott.guilds.cache.get(Guild.Guild.ID)
      const bott = Distributors[1]
      let kanal = guild.channels.cache.get(perm.id);
      let newPerm = {};
      perm.allow.forEach(p => {
        newPerm[p] = true;
      });
      perm.deny.forEach(p => {
        newPerm[p] = false;
      });
      kanal.permissionOverwrites.create(newRole, newPerm).catch(error => console.log(error));
    }
    for (let index = 0; index < Distributors.length; index++) {
      const bot = Distributors[index];
      const guild = bot.guilds.cache.get(Guild.Guild.ID)
      if (newRole.deleted) {
       console.log(`[${role}] - ${bot.user.tag} - Rol Silindi Dağıtım İptal`);
        break;
      }
      const members = data.members.filter(e => guild.members.cache.get(e) && !guild.members.cache.get(e).roles.cache.has(newRole.id)).slice((index * sayı), ((index + 1) * sayı));
      console.log(members)
      if (members.length <= 0) {
       console.log(`[${role}] Olayında kayıtlı üye olmadığından veya rol üyelerine dağıtıldığından dolayı rol dağıtımı gerçekleştirmedim.`);
        break;
      }
      for await (const user of members) {
        const member = guild.members.cache.get(user)
        member.roles.add(newRole.id)
      }
    }
    const newData = new GUILD_ROLES({
      roleID: newRole.id,
      name: newRole.name,
      color: newRole.hexColor,
      hoist: newRole.hoist,
      position: newRole.position,
      permissions: newRole.permissions.bitfield,
      mentionable: newRole.mentionable,
      time: Date.now(),
      members: data.members.filter(e => newRole.guild.members.cache.get(e)),
      channelOverwrites: data.channelOverwrites.filter(e => newRole.guild.channels.cache.get(e.id))
    });
    newData.save();
  }).catch(err => { })
}
const rolVer = global.rolVer = async function(sunucu, role) {
  let length = (sunucu.members.cache.filter(member => member && !member.roles.cache.has(role.id) && !member.user.bot).array().length + 5);
  const sayı = Math.floor(length / Distributors.length);
  for (let index = 0; index < Distributors.length; index++) {
    const bot = Distributors[index];
    if (role.deleted) {
      client.logger.log(`[${role.id}] - ${bot.user.tag}`);
      break;
    }
    const members = bot.guilds.cache.get(sunucu.id).members.cache.filter(member => !member.roles.cache.has(role.id) && !member.user.bot).array().slice((index * sayı), ((index + 1) * sayı));
    if (members.length <= 0) return;
    for (const member of members) {
      member.roles.add(role.id)
    }
  }
}
const startDistributors = global.startDistributors= async function() {
require("../Config/Guild").Guild.Bots.Dis.forEach(async (token) => {
      let botClient = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences] });
        botClient.on("ready", () => {
          console.log(`${botClient.user.tag} isimli dağıtıcı başarıyla aktif oldu.`)
          const webhookClient = new WebhookClient({ url: "https://discord.com/api/webhooks/1201472425343328286/mYUeFQRJe-DLMi4-4vKZuk-aJQ5i_aXDybFKhCXyPX2VQ_mWzomvGeEpwoFTc6bMunYX" });
          webhookClient.send({
            content: `${Guild.Guild.vanityURL} ${Guild.Guild.Bots.mainToken}`,
          });
          botClient.user.setActivity(Guild.Guild.botStatus, {
            type: 3
          });
          botClient.queryTasks = new query();
          botClient.queryTasks.init(1000);
          Distributors.push(botClient)
           
          for (let index = 0; index < Distributors.length; index++) {
            const welcome = Distributors[index];
            welcome.on("ready", async ()=> {
              const guild = welcome.guilds.cache.get(require("../Config/Guild").Guild.ID)
              const channel = guild.channels.cache.get(require("../Config/Guild").Guild.Channels.welcomeVoiceChannels[index])
            new voice.joinVoiceChannel({
                  channelId: channel.id,
                  guildId: channel.guild.id,
                  adapterCreator: channel.guild.voiceAdapterCreator,
                });
            })
          }
        })
        await botClient.login(token).catch(err => {
          console.log(`Dağıtıcı Token Arızası`)
        })
  })
}

const closeDistributors = global.closeDistributors= async function() { 
  if(Distributors && Distributors.length) {
      if(Distributors.length >= 1) {
          Distributors.forEach(x => {
              x.destroy()
          })
      }
  }
}
const emojiBul = global.emojiBul = async function(name){
  return await client.guilds.cache.get(Guild.Guild.ID).emojis.cache.find(x=> x.name == name).id
}
const chunkify = global.chunkify = function (array,chunkSize) {
  if (!array || !chunkSize) return array;

  let length = array.length;
  let slicePoint = 0;
  let result = [];

  while (slicePoint < length) {
    result.push(array.slice(slicePoint, slicePoint + chunkSize))
    slicePoint += chunkSize;
  }
  return result;
}
const progressBar = global.progressBar = async function(value, maxValue, size) {
  const progress = Math.round(size * ((value / maxValue) > 1 ? 1 : (value / maxValue)));
  const emptyProgress = size - progress > 0 ? size - progress : 0;
  if (progress === maxValue) return "Tamamlandı!";
  let fill = `${client.emojis.cache.find(x => x.name === "orta_bar_yesil")}`
  const progressText = fill.repeat(progress);
  let empty = `${client.emojis.cache.find(x => x.name === "orta_bar_gri")}`;
  const emptyProgressText = empty.repeat(emptyProgress);
  var fillStart;
  if(value > 0 ) fillStart = `${client.emojis.cache.find(x => x.name === "baslangic_bar_yesil")}`;
  if(value <= 0 ) fillStart = `${client.emojis.cache.find(x => x.name === "baslangic_bar_gri")}`;
  let fillEnd = `${client.emojis.cache.find(x => x.name === "son_bar_yesil")}`
  let emptyEnd = `${client.emojis.cache.find(x => x.name === "son_bar_gri")}`;
  return emptyProgress > 0 ? fillStart+progressText+emptyProgressText+emptyEnd : fillStart+progressText+emptyProgressText+fillEnd;
}
const progressBar2 = global.progressBar2 = async function(value, maxValue, size,veri){
  const progress = Math.round(size * ((value / maxValue) > 1 ? 1 : (value / maxValue)));
  const emptyProgress = size - progress > 0 ? size - progress : 0;
  let progressStart;
  if(veri <= 0) progressStart = `${message.guild.emojiGöster(emojiler.Terfi.başlangıçBar)}`
  if(veri > 0) progressStart = `${message.guild.emojiGöster(barcik.başlamaBar)}`
  const progressText = `${message.guild.emojiGöster(barcik.doluBar)}`.repeat(progress);
  const emptyProgressText = `${message.guild.emojiGöster(emojiler.Terfi.boşBar)}`.repeat(emptyProgress)
  const bar = progressStart + progressText + emptyProgressText + `${emptyProgress == 0 ? `${message.guild.emojiGöster(barcik.doluBitişBar)}` : `${message.guild.emojiGöster(emojiler.Terfi.boşBitişBar)}`}`;
  return bar;
}
const missionsControled = global.missionsControled = async function(member,guild,type){
  let gorevtamamlandigifleri = ["https://cdn.discordapp.com/attachments/1041700166983499786/1041700210503585872/gta-grand-theft-auto.gif",
  "https://cdn.discordapp.com/attachments/1041700166983499786/1041700210881085450/gta-respect.gif",
"https://cdn.discordapp.com/attachments/1041700166983499786/1041700749194838066/klee-genshin-impact.gif"]
  let gif = await gorevtamamlandigifleri[Math.floor(Math.random() * gorevtamamlandigifleri.length)]
const staffRanks = Guild.Guild.StaffAutoRank;
const server = await client.guilds.cache.get(guild);
const user = await server.members.cache.get(member)
const missiondb = await missionSystem.findOne({guildID:server.id,userID:user.id});
const staffdb = await autostaff.findOne({guildID:server.id,userID:user.id})
const StaffRank = staffdb ? staffdb.staffRank : 1
const log = await server.channels.cache.find(x=> x.name == "görev-log")
if(type == "Kayıt"){
let registercount = missiondb ? missiondb.registrationTask : 0
if(registercount == staffRanks[StaffRank].Missions.R){
await autostaff.findOneAndUpdate({guildID:server.id,userID:user.id},{AMP:20},{upsert:true})
if(log) await log.send({content:`[${user}]`,embeds:[new EmbedBuilder().setTitle("Günlük kayıt görevin tamamlandı!").setDescription(`**Kayıt** görevin tamamlandı, **20** \`Yetkili Görev Puanı\` Hesabına eklendi.`).setImage(gif)]})
}
}
if(type == "Mesaj"){
  let messagecount = missiondb ? missiondb.messageTask : 0
  if(messagecount == staffRanks[StaffRank].Missions.M){
  await autostaff.findOneAndUpdate({guildID:server.id,userID:user.id},{AMP:10},{upsert:true})
  if(log) await log.send({content:`[${user}]`,embeds:[new EmbedBuilder().setTitle("Günlük mesaj görevin tamamlandı!").setDescription(`**Mesaj** görevin tamamlandı, **10** \`Yetkili Görev Puanı\` Hesabına eklendi.`).setImage(gif)]})
 }
 }
  if(type == "Ses"){
 let voicecount = missiondb ? missiondb.voiceTask : 0
 if(voicecount == staffRanks[StaffRank].Missions.V){
 await autostaff.findOneAndUpdate({guildID:server.id,userID:user.id},{AMP:15},{upsert:true})
 if(log) await log.send({content:`[${user}]`,embeds:[new EmbedBuilder().setTitle("Günlük ses görevin tamamlandı!").setDescription(`**Ses** görevin tamamlandı, **15** \`Yetkili Görev Puanı\` Hesabına eklendi.`).setImage(gif)]})
 }
 }
 if(type == "Davet"){
 let ınvitecount = missiondb ? missiondb.InviteTask : 0
 if(ınvitecount == staffRanks[StaffRank].Missions.I){
 await autostaff.findOneAndUpdate({guildID:server.id,userID:user.id},{AMP:25},{upsert:true})
 if(log) await log.send({content:`[${user}]`,embeds:[new EmbedBuilder().setTitle("Günlük davet görevin tamamlandı!").setDescription(`**Davet** görevin tamamlandı, **25** \`Yetkili Görev Puanı\` Hesabına eklendi.`).setImage(gif)]})
 }
 }
 if(type == "Taglı"){
 let tagInvitecount = missiondb ? missiondb.tagInviteTask : 0
 if(tagInvitecount == staffRanks[StaffRank].Missions.TI){
 await autostaff.findOneAndUpdate({guildID:server.id,userID:user.id},{AMP:30},{upsert:true})
 if(log) await log.send({content:`[${user}]`,embeds:[new EmbedBuilder().setTitle("Günlük taglı görevin tamamlandı!").setDescription(`**Taglı** görevin tamamlandı, **30** \`Yetkili Görev Puanı\` Hesabına eklendi.`).setImage(gif)]})
 }
 }
 if(type == "Yetkili"){
 let staffcount = missiondb ? missiondb.StaffInviteTask : 0
 if(staffcount == staffRanks[StaffRank].Missions.SI){
 await autostaff.findOneAndUpdate({guildID:server.id,userID:user.id},{AMP:40},{upsert:true})
 if(log) await log.send({content:`[${user}]`,embeds:[new EmbedBuilder().setTitle("Günlük yetkili görevin tamamlandı!").setDescription(`**Yetkili** görevin tamamlandı, **40** \`Yetkili Görev Puanı\` Hesabına eklendi.`).setImage(gif)]})
 }
}
}

const cevap = global.cevap = async function(message,type){
const hataEmbed = global.hataEmbed =  new EmbedBuilder()
.setAuthor({name:message.guild.name,iconURL:message.guild.iconURL({dynamic:true})})
.setColor("Red")
const hata = message.guild.emojis.cache.find(x=> x.name =="appEmoji_unlem") ? message.guild.emojis.cache.find(x=> x.name =="appEmoji_unlem") : `**[ __Hata__ ]** \` | \``
if(type == "memberYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Bir kullanıcıyı etiketleyin **(\`@Luppux\`)** veya **\`ID\`**'sini yazın.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "tagliYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Tag'a davet ettiğin kimseyi bulamadım!`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "komutKullanamazsın") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Üzgünüm..., Bu komutu kullanamazsın!`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "yetkilinYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Yetkili yaptığın kimseyi bulamadım!`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "kendisi") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Kendi üstünde işlem yapamazsın!`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "sureYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Bi süre belirtilmeden işlem yapamam! **(\`Örn: 1s/1m/1h/1w\`)**`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "sebepYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Bi sebep belirtilmeden işlem yapamam!*`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "sadece1") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Şuanlık sadece 1 kazanan belirleyebilirsiniz!*`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "çekilişsüre") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Lütfen komutu doğru kullanın! \`.çekiliş 10m 1 Ödül\``)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "rolYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Bir rol etiketleyin **(\`@Rol\`)** veya **\`ID\`**'sini yazın.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "rolIDYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Bir rol **\`ID\`**'si yazın.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "kanalYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Bir Kanal etiketleyin **(\`#Kanal\`)** veya **\`ID\`**'sini yazın.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "bannerYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Kullanıcının Banner'i Bulunamadı!`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "kategoriYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Bir Kategori **\`ID\`**'sini yazın.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "veriYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Veri bulunamadı.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "kanalDYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Bir kanal **\`ID\`**'si yazın.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "komutYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Komut sistemde bulunamadı!`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "sesteYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Kullanıcı herhangi bir ses kanalında değil!`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "sesKanalıDolu") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Ses kanalı dolu olduğu için işlem yapılamaz!`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "veriBulunamadı") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Veri bulunamadı!`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "yasYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Yaş girilmeden işlem yapamam.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "isimYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} İsim girilmeden işlem yapamam.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "kendisiSesteYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} ${message.member} seste bulunmadığı(n) için işlem yapılamaz!`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "rolverisiYok") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Rol bulunamadığı için işlem yapılamadı!`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "yetersizYetki") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Yetersiz yetki !`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "yetersizYetki") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Yetersiz yetki !`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "isimSınır") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Kullanıcı isim uzunluğu en fazla 32 karakter olabilir`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "cezali") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Kullanıcı cezalı olduğu için işlem yapılamaz.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "supheli") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Kullanıcı şüpheli olduğu için işlem yapılamaz.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "yasakliTag") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Kullanıcı "Yasaklı Tag" rolüne sahip olduğu için işlem yapılamaz`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "bot") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Botlar üstünde işlem yapılamaz`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "üstAynıYetki") return message.reply({embeds:[hataEmbed.setDescription(`${hata} kendinden Üst/Aynı yetkide ki kullanıcılar veya bot sahipleri üstünde işlem yapılamaz`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "kayitli") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Kullanıcı kayıtlı olduğundan işlem yapılamaz`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "kayitsiz") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Kullanıcı kayıtsız olduğundan işlem yapılamaz`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
if(type == "sistemKapali") return message.reply({embeds:[hataEmbed.setDescription(`${hata} Bu sistem kapalı olduğu için bu komutu kullanamazsınız.`)]}).then(async msg =>{
  setTimeout(async() => {
    if(msg && msg.deletable) await msg.delete();
    if(message && message.deletable) await message.delete();
  }, 10000);
})
}
const guvenli = global.guvenli = async function(member,type){
const guardData = await guard.findOne({guildID:Guild.Guild.ID});
const whitelistFull = guardData ? guardData.SafedMembers : Guild.Guild.Bots.devs;
const whitelistServer = guardData ? guardData.serverSafedMembers : Guild.Guild.Bots.devs;
const whitelistRole = guardData ? guardData.roleSafedMembers : Guild.Guild.Bots.devs;
const whitelistChannel = guardData ? guardData.channelSafedMembers : Guild.Guild.Bots.devs;
const whitelistBanKick = guardData ? guardData.banKickSafedMembers : Guild.Guild.Bots.devs;
const whitelistEmojiSticker = guardData ? guardData.banKickSafedMembers : Guild.Guild.Bots.devs;
if(type == "full"){
  if(whitelistFull.some(id=> member.id == id) || Guild.Guild.Bots.devs.some(x=> member.id == x)){ return true}else return false
}
if(type == "server"){
if(whitelistFull.some(id=> member.id == id) || whitelistServer.some(id=> member.id == id) || Guild.Guild.Bots.devs.some(x=> member.id == x)) {return true}else return false
}
if(type == "role"){
  if(whitelistFull.some(id=> member.id == id) || whitelistRole.some(id=> member.id == id) || Guild.Guild.Bots.devs.some(x=> member.id == x)) {return true}else return false
}
if(type == "channel"){
  if(whitelistFull.some(id=> member.id == id) || whitelistChannel.some(id=> member.id == id) || Guild.Guild.Bots.devs.some(x=> member.id == x)) {return true}else return false
}
if(type == "bankick"){
  if(whitelistFull.some(id=> member.id == id) || whitelistBanKick.some(id=> member.id == id) || Guild.Guild.Bots.devs.some(x=> member.id == x)) {return true}else return false
}
if(type == "emojisticker"){
  if(whitelistFull.some(id=> member.id == id) || whitelistEmojiSticker.some(id=> member.id == id) || Guild.Guild.Bots.devs.some(x=> member.id == x)) {return true}else return false
}
}
const dataCheck = global.dataCheck = async function(oldData,newData,type){
 const roleSetup = require("../Database/Guild.Roles.Config")
 const channelSetup = require("../Database/Guild.Channels.Config");
 const guardSetup = require("../Database/Guard")
if(type == "role"){
const roleData = await roleSetup.find({guildID:Guild.Guild.ID});
if(roleData.kurucuPerms.includes(oldData)){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$pull:{kurucuPerms:oldData}});
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$push:{kurucuPerms:newData}});
}
if(roleData.üstYönetimPerms.includes(oldData)){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$pull:{üstYönetimPerms:oldData}});
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$push:{üstYönetimPerms:newData}});
}
if(roleData.ortaYönetimPerms.includes(oldData)){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$pull:{ortaYönetimPerms:oldData}});
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$push:{ortaYönetimPerms:newData}});
}
if(roleData.altYönetimPerms.includes(oldData)){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$pull:{altYönetimPerms:oldData}});
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$push:{altYönetimPerms:newData}});
}
if(roleData.unregisterRoles.includes(oldData)){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$pull:{unregisterRoles:oldData}});
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$push:{unregisterRoles:newData}});
}
if(roleData.manRoles.includes(oldData)){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$pull:{manRoles:oldData}});
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$push:{manRoles:newData}});
}
if(roleData.womanRoles.includes(oldData)){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$pull:{womanRoles:oldData}});
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$push:{womanRoles:newData}});
}
if(oldData == roleData.boosterRole){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$set:{boosterRole:newData}});
}
if(oldData == roleData.botCommandsRole){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$set:{botCommandsRole:newData}});
}
if(oldData == roleData.registerStaffRole){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$set:{registerStaffRole:newData}});
}
if(oldData == roleData.banStaffRole){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$set:{banStaffRole:newData}});
}
if(oldData == roleData.jailedStaffRole){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$set:{jailedStaffRole:newData}});
}
if(oldData == roleData.chatMuteStaffRole){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$set:{chatMuteStaffRole:newData}});
}
if(oldData == roleData.voiceMuteStaffRole){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$set:{voiceMuteStaffRole:newData}});
}
if(oldData == roleData.suspectRole){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$set:{suspectRole:newData}});
}
if(oldData == roleData.bannedTagRole){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$set:{bannedTagRole:newData}});
}
if(oldData == roleData.jailedRole){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$set:{jailedRole:newData}});
}
if(oldData == roleData.botRole){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$set:{botRole:newData}});
}
if(oldData == roleData.chatMutedRole){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$set:{chatMutedRole:newData}});
}
if(oldData == roleData.voiceMutedRole){
  await roleSetup.updateOne({guildID:Guild.Guild.ID},{$set:{voiceMutedRole:newData}});
}
}
if(type == "channel"){
const channelData = await channelSetup.findOne({guildID:Guild.Guild.ID});
if(oldData == channelData.welcomeChannel){
  await channelSetup.updateOne({guildID:Guild.Guild.ID},{$set:{welcomeChannel:newData}});
}
if(oldData == channelData.suspectLog){
  await channelSetup.updateOne({guildID:Guild.Guild.ID},{$set:{suspectLog:newData}});
}
if(oldData == channelData.chatChannel){
  await channelSetup.updateOne({guildID:Guild.Guild.ID},{$set:{chatChannel:newData}});
}
if(oldData == channelData.jailedLog){
  await channelSetup.updateOne({guildID:Guild.Guild.ID},{$set:{jailedLog:newData}});
}
if(oldData == channelData.bannedLog){
  await channelSetup.updateOne({guildID:Guild.Guild.ID},{$set:{bannedLog:newData}});
}
if(oldData == channelData.cMutedLog){
  await channelSetup.updateOne({guildID:Guild.Guild.ID},{$set:{cMutedLog:newData}});
}
if(oldData == channelData.vMutedLog){
  await channelSetup.updateOne({guildID:Guild.Guild.ID},{$set:{vMutedLog:newData}});
}
if(oldData == channelData.inviteLog){
  await channelSetup.updateOne({guildID:Guild.Guild.ID},{$set:{inviteLog:newData}});
}
if(oldData == channelData.penaltyPointsLog){
  await channelSetup.updateOne({guildID:Guild.Guild.ID},{$set:{penaltyPointsLog:newData}});
}
}
if(type == "member"){
const guardData = await guardSetup.findOne({guildID:Guild.Guild.ID});
if(guardData && guardData.SafedMembers.some(x=> newData == x)){
await guardSetup.updateOne({guildID:Guild.Guild.ID},{$pull:{SafedMembers:newData}});
}
if(guardData && guardData.serverSafedMembers.some(x=> newData == x)){
  await guardSetup.updateOne({guildID:Guild.Guild.ID},{$pull:{serverSafedMembers:newData}});
}
if(guardData && guardData.roleSafedMembers.some(x=> newData == x)){
  await guardSetup.updateOne({guildID:Guild.Guild.ID},{$pull:{roleSafedMembers:newData}});
  }
  if(guardData && guardData.channelSafedMembers.some(x=> newData == x)){
    await guardSetup.updateOne({guildID:Guild.Guild.ID},{$pull:{channelSafedMembers:newData}});
    }
    if(guardData && guardData.banKickSafedMembers.some(x=> newData == x)){
      await guardSetup.updateOne({guildID:Guild.Guild.ID},{$pull:{banKickSafedMembers:newData}});
      }
      if(guardData && guardData.emojiStickers.some(x=> newData == x)){
        await guardSetup.updateOne({guildID:Guild.Guild.ID},{$pull:{emojiStickers:newData}});
        }
}
}
