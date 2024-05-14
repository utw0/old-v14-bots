
const { EmbedBuilder,PermissionsBitField, InteractionType, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder,SelectMenuInteraction, SelectMenuComponent  } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const User = require("../../../../Global/Database/Users")
class roleSelect extends Command {
    constructor(client) {
        super(client, {
            name: "roleSelect",
            description: "Rol Seçme Panelini Oluşturur",
            usage: ".roleselect",
            category: "Approval",
            aliases: ["rs"],

            guildOwner:true,
            developer : true
        });
    }
    

  async  onLoad(client) {
    client.on("interactionCreate", async (i) => {
      const guild = client.guilds.cache.get(Guild.ID)
        let menu = i.customId
        const member =  guild.members.cache.get(i.member.id)
        if (!member) return;
        if (menu === "renkRolleri") {
          if(!member.roles.cache.has("1073263904857260032") && !member.roles.cache.has("1079357079137042462")) return i.reply({content:`Renk rollerini almak için sunucuya takviye yapmanız veya tagı almanız lazım.`,ephemeral:true})
          let renkrolleri = []
          let renkroller = ["1079357068324118629","1079357069079093322","1079357070484176928","1079357071729897532","1079357073369858048","1079357074418450494","1079357076020666460"]
          renkroller.forEach(x=> renkrolleri.push([x,x]))
          let yeto = new Map(renkrolleri)
            var rols = []
            for (let index = 0; index < i.values.length; index++) {
                let ids = i.values[index]
                let den = yeto.get(ids)
                rols.push(den)
              }
            if (i.values[0] === "rolsil") {
             member.roles.remove(renkroller)
              return i.reply({content:"Başarılı bir şekilde roller üzerinizden kaldırıldı.", ephemeral:true})
    
            } 
              if (!i.values.length) {
                 member.roles.remove(renkroller)
                return i.reply({content:"Başarılı bir şekilde seçtiğiniz roller üzerinizden kaldırıldı.", ephemeral:true})
          
              } else {
                 member.roles.remove(renkroller)
                 setTimeout(async() => {await member.roles.add(rols)}, 1000);
              }
              i.reply({ content: "Başarılı bir şekilde seçtiğiniz roleriniz üzerine verildi.", ephemeral: true })
               
        }
        if (menu === "oyunRolleri") {
          var oyunroller = [];
          let oyunrolleri =["1079357146900201523","1079357148112359565","1079357149366468638","1079357150377300028","1079357151555887154","1079357152919048232","1079357153808220272"]
          oyunrolleri.forEach(x=> oyunroller.push([x,x]) )
          let yeto = new Map(oyunroller)
            if (i.values[0] === "rolsil") {
             member.roles.remove(oyunrolleri)
              return i.reply({content:"Başarılı bir şekilde oyun rolleri üzerinizden kaldırıldı.", ephemeral:true})
    
            } 
            var rols = []
            for (let index = 0; index < i.values.length; index++) {
                let ids = i.values[index]
                let den = yeto.get(ids)
                rols.push(den)
              }
              if (!i.values.length) {
                 member.roles.remove(rols)
                return i.reply({content:"Başarılı bir şekilde seçtiğiniz oyun roller üzerinizden kaldırıldı.", ephemeral:true})
          
              } else {
                 member.roles.remove(rols)
                 member.roles.add(rols)
              }
              rols = [];
              i.reply({ content: "Başarılı bir şekilde seçtiğiniz oyun rolleriniz üzerine verildi.", ephemeral: true })
               
        } 
        if (menu === "burcRolleri") {
          let burcroller = [];
          let burcRolleri =  [
            "1079357130160754779","1079357131377102858","1079357132920594603","1079357134015299736","1079357135147769927","1079357136733208726","1079357138272530462","1079357139488886836","1079357140386451508","1079357141657325578","1079357142861086741","1079357144043900978"
             ];
          burcRolleri.forEach(x=> burcroller.push([x,x]))
          let yeto = new Map(burcroller)
            if (i.values[0] === "rolsil") {
             member.roles.remove(burcRolleri)
              return i.reply({content:"Başarılı bir şekilde burç rolleri üzerinizden kaldırıldı.", ephemeral:true})
    
            } 
            var rols = []
            for (let index = 0; index < i.values.length; index++) {
                let ids = i.values[index]
                let den = yeto.get(ids)
                rols.push(den)
              }
              if (!i.values.length) {
                 member.roles.remove(rols)
                return i.reply({content:"Başarılı bir şekilde seçtiğiniz burç roller üzerinizden kaldırıldı.", ephemeral:true})
        
              }
               rols = []
               console.log({a:i.values,b:i.values[0]})
               member.roles.remove(burcRolleri)
               setTimeout(async() => {await member.roles.add(i.values[0])}, 1000);

              i.reply({ content: "Başarılı bir şekilde seçtiğiniz burç rolleriniz üzerine verildi.", ephemeral: true })
            
        } 
        if(menu == "cekilis"){
          if(member.roles.cache.has("1079357126708838420")){
          await member.roles.remove("1079357126708838420")
          i.reply({content:`<@&1079357126708838420> rolü üzerinden alındı!`,ephemeral:true})
          }else{
            await member.roles.add("1079357126708838420")
            i.reply({content:`<@&1079357126708838420> rolü üzerine verildi!`,ephemeral:true})
          }
        }
        if(menu == "etkinlik"){
          if(member.roles.cache.has("1079357127774195792")){
            await member.roles.remove("1079357127774195792")
            i.reply({content:`<@&1079357127774195792> rolü üzerinden alındı!`,ephemeral:true})
            }else{
              await member.roles.add("1079357127774195792")
              i.reply({content:`<@&1079357127774195792> rolü üzerine verildi!`,ephemeral:true})
            }
        }
        if(menu == "alone"){
          if(member.roles.cache.has("1079357118492180500")) await member.roles.remove("1079357118492180500");
          if(member.roles.cache.has("1079357118492180500")){
            await member.roles.remove("1079357118492180500")
            i.reply({content:`<@&1079357118492180500> rolü üzerinden alındı!`,ephemeral:true})
            }else{
              await member.roles.add("1079357118492180500")
              i.reply({content:`<@&1079357118492180500> rolü üzerine verildi!`,ephemeral:true})
            }
        }
        if(menu == "couple"){
          if(member.roles.cache.has("1079357122602602516")) await member.roles.cache.remove("1070701863185416251")
          if(member.roles.cache.has("1079357122602602516")){
            await member.roles.remove("1079357122602602516")
            i.reply({content:`<@&1079357122602602516> rolü üzerinden alındı!`,ephemeral:true})
            }else{
              await member.roles.add("1070701863239962724")
              i.reply({content:`<@&1079357122602602516> rolü üzerine verildi!`,ephemeral:true})
            }
        }

    })
    }

async onRequest (client, message, args,embed) {

let ec = new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId("etkinlik").setLabel("Etkinlik Katılımcısı").setEmoji("🎉").setStyle(ButtonStyle.Secondary),
new ButtonBuilder().setCustomId("cekilis").setLabel("Çekiliş Katılımcısı").setEmoji("🎁").setStyle(ButtonStyle.Secondary),
)
  message.channel.send({content:`Merhaba \`${client.user.username}\` üyeleri,
  
Sunucuda sizi rahatsız etmemek için \`@everyone & @here\` atılmıcaktır.
Sunucuda olucak **Çekiliş** ve **Etkinlik**lerden anında haberdar olmak için aşağıda bulunan butonlardan gerekli rolleri alabilirsiniz.

\` | \` \`Çekiliş Katılımcısı 🎁:\` Çekilişlerden anında haberdar olmak için **tıklayın.**

\` | \` \`Etkinlik Katılımcısı 🎉:\` Etkinliklerden anında haberdar olmak için **tıklayın.**
`,components:[ec]}).then(async msg =>{
  /* Renk Rolleri */
  let renkrolleri =["1079357068324118629","1079357069079093322","1079357070484176928","1079357071729897532","1079357073369858048","1079357074418450494","1079357076020666460"]
  let renkrollerisecenegi = [{label: "🗑", description:`Üzerinizdeki Rolleri Temizler`, value:"rolsil"}];
  renkrolleri.forEach(async x => {renkrollerisecenegi.push({label: message.guild.roles.cache.get(x).name, description:`${message.guild.roles.cache.get(x).name} Rolünü almak için tıkla !`, value:x})})
let renkrollerimenusu = new ActionRowBuilder().addComponents(new SelectMenuBuilder().setCustomId("renkRolleri").setPlaceholder("Üzerinize almak istediğiniz rolleri seçin!").setMaxValues(1).setOptions(renkrollerisecenegi))
message.channel.send({components:[renkrollerimenusu], content:`**Aşağıda bulunan menüden üzerinize istediğiniz renk rolünden birini alabilirsiniz.**`})
// /*Oyun rolleri */
 let oyunrolleri = ["1079357146900201523","1079357148112359565","1079357149366468638","1079357150377300028","1079357151555887154","1079357152919048232","1079357153808220272"];
 let oyunrollerisecenegi = [{label: "🗑", description:`Üzerinizdeki Rolleri Temizler`, value:"rolsil"}];
 oyunrolleri.forEach(async x => {oyunrollerisecenegi.push({label: message.guild.roles.cache.get(x).name, description:`${message.guild.roles.cache.get(x).name} Rolünü almak için tıkla !`, value:x})})
 let oyunrollerimenusu = new ActionRowBuilder().addComponents(new SelectMenuBuilder().setCustomId("oyunRolleri").setPlaceholder("Üzerinize almak istediğiniz rolleri seçin!").setMaxValues(3).setOptions(oyunrollerisecenegi))
 message.channel.send({components:[oyunrollerimenusu], content:`**Aşağıda bulunan menüden üzerinize istediğiniz oyun rollerinden alabilirsiniz.**`})
 /* Burc Rolleri*/
 let burcrolleri = [
  "1079357130160754779","1079357131377102858","1079357132920594603","1079357134015299736","1079357135147769927","1079357136733208726","1079357138272530462","1079357139488886836","1079357140386451508","1079357141657325578","1079357142861086741","1079357144043900978"
 ];
 let burcrollerisecenegi = [{label: "🗑", description:`Üzerinizdeki Rolleri Temizler`, value:"rolsil"}];
 burcrolleri.forEach(async x => {burcrollerisecenegi.push({label: message.guild.roles.cache.get(x).name, description:`${message.guild.roles.cache.get(x).name} Rolünü almak için tıkla !`, value:x})})
 let burcrollerimenusu = new ActionRowBuilder().addComponents(new SelectMenuBuilder().setCustomId("burcRolleri").setPlaceholder("Üzerinize almak istediğiniz rolleri seçin!").setMaxValues(1).setOptions(burcrollerisecenegi))
 message.channel.send({components:[burcrollerimenusu], content:`**Aşağıda bulunan menüden üzerinize istediğiniz burç rolünden birini alabilirsiniz.**`})
})
let sev = new ActionRowBuilder().addComponents(
  new ButtonBuilder().setCustomId("couple").setLabel("Sevgilim Var ❤️").setEmoji("❤").setStyle(ButtonStyle.Primary),
  new ButtonBuilder().setCustomId("alone").setLabel("Sevgilim Yok 💔").setEmoji("🖤").setStyle(ButtonStyle.Primary),
  )
message.channel.send({components:[sev],content:`**Aşağıda ki butonlar ile istediğiniz oyun etkinlikleri rollerini alabilirsiniz. **`})
}
}
module.exports = roleSelect;