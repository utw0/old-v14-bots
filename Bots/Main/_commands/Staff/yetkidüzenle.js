
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,SelectMenuBuilder  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const {StaffAutoRank} = require("../../../../Global/Config/Guild").Guild
const guildAutoStaffdb = require("../../../../Global/Database/SystemDB/guild.auto.staff")
const yetkiliyapdb = require("../../../../Global/Database/SystemDB/yetkiliyap")
const yetkiliyapstaffdb = require("../../../../Global/Database/SystemDB/yetkiliyap.staff")
const tagsistem = require("../../../../Global/Database/SystemDB/guildTag")
const missionsystem = require("../../../../Global/Database/SystemDB/mission.system")

class yetkidüzenle extends Command {
    constructor(client) {
        super(client, {
            name: "yetkidüzenle",
            description: "Yetkililin yetkilerini ve görevlerini düzenlemek için kullanlır.",
            usage: ".yetkidüzenle",
            category: "Staff",
            aliases: ["yetkidüzenle","yd"],

            enabled: true,
 
            });
    }
async onRequest (client, message, args,embed) {
  if( [PermissionsBitField.Flags.Administrator,PermissionsBitField.Flags.ManageRoles,PermissionsBitField.Flags.BanMembers,PermissionsBitField.Flags.KickMembers,].some(x=> message.member.permissions.has(x))
  ||
  [...roles.kurucuPerms].some(x=> message.member.roles.cache.has(x))){
    const data = await tagsistem.findOne({guildID:message.guild.id});      
    const a = data.only 
    if(a == true) {
      let missionsystemdb = await missionsystem.findOne({guildID:message.guild.id});
let mission_system = missionsystemdb ? missionsystemdb.only : false;
if(mission_system == true){
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!member) return cevap(message,"memberYok")
  var guildAutoStaff = await guildAutoStaffdb.findOne({guildID:message.guild.id,userID:member.id})
  const authorityStatus = guildAutoStaff ? guildAutoStaff.authorityStatus : false
  if(authorityStatus == false) return message.reply({embeds:[embed.setDescription(`${member} yetkili olmadığı için bu işlem yapılamaz. \`.yetkliyap ${member.id}\` ile yetkili yapabilirsiniz. ardından bu komutu kullanınız.`)]});
  else{
    let array = [];
    let staffRank = await Object.keys(StaffAutoRank)
    console.log(StaffAutoRank[1].Missions.V)
   for (let i = 1; i < staffRank.length+1; i++) {
     const element = StaffAutoRank[i];

     array.push({label: `[${i}] - ${message.guild.roles.cache.get(element.Role).name}`, description: `Puan: ${element.AMP} | ID: ${element.Role}`, value:`Approval-${i}`})
   }
   let menu = new ActionRowBuilder()
   .addComponents(
    new SelectMenuBuilder()
    .setCustomId("rolliste")
    .setMaxValues(1)
    .setPlaceholder("vermek istediğiniz yetkiyi seçin!")
    .setOptions(array)
    )
let msg = await message.channel.send({embeds:[embed.setDescription(`${member} kullanıcısının yetkisini değiştirmek için aşağıda ki menüyü kullanın.`)],components:[menu]})
var filter = (button) => button.user.id === message.member.id;
const collector = msg.createMessageComponentCollector({ filter, time: 30000 });
collector.on('collect', async (i) => {
  await i.deferUpdate();
for (let number = 1; number < array.length+1; number++) {
if(i.values[0] == `Approval-${number}`){
i.channel.send({components:[new ActionRowBuilder()
  .addComponents(
   new ButtonBuilder().setCustomId("evet").setLabel("Evet").setStyle(ButtonStyle.Success),
   new ButtonBuilder().setCustomId("hayir").setLabel("Hayır").setStyle(ButtonStyle.Danger),
  )],content:`[${message.member}]`,embeds:[embed.setDescription(`${member}, Yetkisini aşağıda ki yetki ve görevler ile değiştirmek istediğine emin misin ?`)
  .addFields({name:`[${number}] - ${message.guild.roles.cache.get(StaffAutoRank[number].Role).name}`,
  value:
`\`Rol Adı     :\` ${message.guild.roles.cache.get(StaffAutoRank[number].Role).name}
\`Gerekli Puan :\` ${StaffAutoRank[number].AMP}
\`Yetkileri    :\` ${StaffAutoRank[number].Powers.map(x=> message.guild.roles.cache.get(x).name).join(", ")}
**Görevleri:**
\`Kayıt    :\` **${StaffAutoRank[number].Missions.R}**
\`Ses      :\` **${sureCevir(StaffAutoRank[number].Missions.V)}**
\`Mesaj    :\` **${StaffAutoRank[number].Missions.M}**
\`Davet    :\` **${StaffAutoRank[number].Missions.I}**
\`Taglı    :\` **${StaffAutoRank[number].Missions.TI}**
\`Yetkili  :\` **${StaffAutoRank[number].Missions.SI}**
`
})
/*V:3600000,M:100,R:10,I:10,TI:5,SI:5 */
]}).then(async msg_x =>{
  var filter = (button) => button.user.id === message.member.id;
const collector_x = msg_x.createMessageComponentCollector({ filter, time: 30000 });
collector_x.on('collect', async (i_x) => {
  await i_x.deferUpdate();
  if(i_x.customId="evet"){
  let tarih = guildAutoStaff.startingdate
  let staff = guildAutoStaff.StaffID
  await member.roles.remove([StaffAutoRank[guildAutoStaff.staffRank].Role,...StaffAutoRank[guildAutoStaff.staffRank].Powers])
  setTimeout(async() => {await member.roles.add([StaffAutoRank[number].Role,...StaffAutoRank[number].Powers])}, 1000);
  i_x.channel.send({content:`**işlem başarılı**, ${member} kullanıcısının yetkileri düzenlendi!`})
  await guildAutoStaffdb.findOneAndUpdate({guildID:message.guild.id,userID:member.id},{$set:{staffID:staff,startingdate:tarih,staffRank:number,authorityStatus:true,AMP:0}},{upsert:true});

  if(msg) await msg.delete();
  if(message) await message.delete();
  if(msg_x) await msg_x.delete();
  
  }
  if(i_x.customId="hayir"){
    if(msg_x) await msg_x.delete();
    if(msg) await msg.delete();
    if(message) await message.delete();
  }
})
collector_x.on("end", async (collected, reason) => {
  if (reason === "time") {
    if(msg_x) await msg_x.delete();
    if(msg) await msg.delete();
    if(message) await message.delete();
  }
});
})
}
}
})
collector.on("end", async (collected, reason) => {
    if (reason === "time") {
      if (msg) await msg.delete()
      if(message) await message.delete();
    }
  });
   /* 
     StaffAutoRank:{
    1:{Role:"1028677053228273681",Powers:["1028677053198913550","1028677053198913552"], AMP:0,Missions:{V:3600000,M:100,R:10,I:10,TI:5,SI:5}},
    2:{Role:"1028677053228273682",Powers:["1028677053198913550","1028677053198913552","1031635529936154664"], AMP:200,Missions:{V:3600000*2,M:100*2,R:10*2,I:10*2,TI:5*2,SI:5*2}}
    }
    i++ neden
     */
    /*let liste = [];
    let staffranks = await Object.keys(StaffAutoRank)
    for (let i = 1; i < staffranks.length+1; i++) {
      const ranks = await StaffAutoRank[i];
      console.log(ranks)
      liste.push({label: i+" | ID: "+ranks.Role,description:`${await ranks.Powers.map(x=> message.guild.roles.cache.get(x).name).join(", ")}`,value:i})
    }*/
    // console.log("-------------------------------------")




  }
}

      }else  return cevap(message,"sistemKapali");
    }else return cevap(message,"komutKullanamazsın")
  }
}
module.exports = yetkidüzenle;