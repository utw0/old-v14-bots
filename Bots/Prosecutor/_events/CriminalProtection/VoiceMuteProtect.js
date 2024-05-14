const { Collection, EmbedBuilder, PermissionsBitField,Formatters,ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const cooldown = new Collection();
const ms = require('ms');
const penalty =require("../../../../Global/Database/penaltyDB/penaltys")
class VoiceMuteProtect extends Event {
    constructor(client) {
        super(client, {
            name: "voiceChannelUnmute",
            enabled: true,
        });
    }
    
 async onLoad(member, oldMuteType) {
    const data = await penalty.find();
    let cezakontrol = await data.filter(x=> x.penaltys.some(x=> x.type == "VOICE-MUTE" && x.Punished == member.id && x.Finished == false)).length > 0
    if(cezakontrol){
        if((roles && roles.voiceMutedRole) && !member.roles.cache.has(roles.voiceMutedRole)) member.roles.add(roles.voiceMutedRole)               
        if(member && member.voice.mute == false) await member.voice.setMute(true);
    }

    
 }
}
module.exports = VoiceMuteProtect
