const { Event } = require("../../../../Global/Structures/Default.Events");
const chalk = require('chalk')
const {Guild} = require("../../../../Global/Config/Guild")
const { CronJob } = require("cron");
const {Collection} = require("discord.js")
const guildConfig = require("../../../../Global/Database/Guild.Config.js")
const guildSystemConfig = require("../../../../Global/Database/SystemDB/GuildLevelSystem")
const guildRoles = require("../../../../Global/Database/Guild.Roles.Config")
const guildChannels = require("../../../../Global/Database/Guild.Channels.Config")
const cezapuan = require("../../../../Global/Database/penaltyDB/cezapuan")
const penalty =require("../../../../Global/Database/penaltyDB/penaltys")
const mute = require("../../../../Global/Database/penaltyDB/mute")

class ready extends Event {
    constructor(client) {
        super(client, {
            name: "ready",
            enabled: true,
        });    
    }    

 async   onLoad() {
  
        _status(
            [

                {name:Guild.botStatus, type:3},


            ],
            ["dnd","online","idle"],
            {
                on: false,
                activities: 5000,
                status: 30000
            }
        )
        const guild = client.guilds.cache.get(Guild.ID)
        const channel = guild.channels.cache.get(Guild.botVoiceChannel)
        const guildSettings = await guildConfig.findOne({guildID: guild.id});
        const guildSystemSettings = await guildSystemConfig.findOne({guildID: guild.id});
        const roles = global.roles = await guildRoles.findOne({guildID:guild.id});
        const channels = global.channels = await guildChannels.findOne({guildID:guild.id});

        voice.joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
          });
          setInterval(async() => {
            await voice.joinVoiceChannel({
              channelId: channel.id,
              guildId: channel.guild.id,
              adapterCreator: channel.guild.voiceAdapterCreator,
            })
          }, 15 * 1000);
        console.log(`[${tarihsel(Date.now())}] ${chalk.green.bgHex('#2f3236')(`Başarıyla Giriş Yapıldı: ${client.user.tag}`)}`)
    }
}    


function _status(activities, status, time) {
    if(!time.on) {
        client.user.setActivity(activities[0])
        client.user.setStatus(status[0])
    }  else {
        let i = 0;
        setInterval(() => {
            if(i >= activities.length) i = 0
            client.user.setActivity(activities[i])
            i++;
        }, time.activities);
    
        let s = 0;
        setInterval(() => {
            if(s >= activities.length) s = 0
            client.user.setStatus(status[s])
            s++;
        }, time.status);
    }
}

module.exports = ready;
