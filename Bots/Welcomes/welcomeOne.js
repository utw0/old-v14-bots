const DiscordOne = require('discord.js');
const logs = require('discord-logs');
const {ID,Bots,welcomeVoiceLink} = require("../../Global/Config/Guild").Guild
/* -------------------------------------------------------------------------------------------------------------  */
const client = new DiscordOne.Client({ intents: 32767 });
logs(client);
const welcomeOneToken =Bots.Dis[0]
const welcomeOneVoice = require('@discordjs/voice');
client.login(welcomeOneToken)
var connectionOne;
var playerOne;
var resourceOne;
client.on("ready",async ()=>{
const guildOne = await client.guilds.cache.get(ID);
const channelOne = await guildOne.channels.cache.get("1066294817878986788")
connectionOne = welcomeOneVoice.joinVoiceChannel({channelId: channelOne.id,guildId: guildOne.id,adapterCreator: guildOne.voiceAdapterCreator,});
})
client.on("voiceChannelJoin", async (member, channel) =>{
const user = channel.guild.members.cache.get(member.id)
if(user.roles.cache.has("1066294817165955148") && channel.id == "1066294817878986788"){
playerOne = welcomeOneVoice.createAudioPlayer();
resourceOne = welcomeOneVoice.createAudioResource(welcomeVoiceLink[Math.floor(Math.random() * welcomeVoiceLink.length)]);
await playerOne.play(resourceOne)
await connectionOne.subscribe(playerOne)
playerOne = undefined;
resourceOne = undefined;
}
})
