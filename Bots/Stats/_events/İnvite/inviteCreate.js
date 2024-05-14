
const { Collection, EmbedBuilder, PermissionsBitField,Formatters,ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const ms = require('ms');
const inviteSchema = require("../../../../Global/Database/invite/inviteSchema.js")
    const guildInviteSystemDB = require("../../../../Global/Database/SystemDB/guild.invite.system")
class inviteCreate extends Event {
    constructor(client) {
        super(client, {
            name: "inviteCreate",
            enabled: true,
        });
    }
    
 async onLoad(invites) {

    const guildInviteSystem = await guildInviteSystemDB.findOne({guildID:invites.guild.id});
    const guildInviteSystemControl = guildInviteSystem ? guildInviteSystem.InviteSystem : false; 
if(guildInviteSystemControl == true) {
    const invite = await invites.guild.invites.fetch();

    const codeUses = new Map();
    invite.each(inv => codeUses.set(inv.code, inv.uses));
    guildInvites.set(invites.guild.id, codeUses);
}
 }
}
module.exports = inviteCreate