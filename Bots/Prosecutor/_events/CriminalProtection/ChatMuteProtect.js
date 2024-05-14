const { Collection, EmbedBuilder, PermissionsBitField,Formatters,ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const cooldown = new Collection();
const ms = require('ms');
const penalty =require("../../../../Global/Database/penaltyDB/penaltys")
class ChatMuteProtect extends Event {
    constructor(client) {
        super(client, {
            name: "guildMemberRoleRemove",
            enabled: true,
        });
    }
    
 async onLoad(member, role) {
if(role.id == roles.chatMutedRole) {
const data = await penalty.find();
let cezakontrol = await data.filter(x=> x.penaltys.some(x=> x.type == "CHAT-MUTE" && x.Punished == member.id && x.Finished == false)).length > 0
if(cezakontrol) await member.roles.add(roles.chatMutedRole)
}
 }
}
module.exports = ChatMuteProtect
