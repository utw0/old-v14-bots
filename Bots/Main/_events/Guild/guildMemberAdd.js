const { Collection, EmbedBuilder, PermissionsBitField,Formatters,ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { Event } = require("../../../../Global/Structures/Default.Events");
const cooldown = new Collection();
const ms = require('ms');
const {Guild} = require("../../../../Global/Config/Guild")
const bannedTagSystem = require("../../../../Global/Database/SystemDB/guildBannedTag");
const tagsistem = require("../../../../Global/Database/SystemDB/guildTag")

class guildMemberAdd extends Event {
    constructor(client) {
        super(client, {
            name: "guildMemberAdd",
            enabled: true,
        });
    }
    
 async onLoad(member) {
        const guild = client.guilds.cache.get(Guild.ID);
        if(member.guild.id == guild.id){
        const welcomeChannel = guild.channels.cache.get(channels.welcomeChannel);
        const suspectChannel = guild.channels.cache.get(channels.suspectLog);
        const bannedTagChannel = guild.channels.cache.find(x=> x.name == "yasaklıtag_log")
        const bannedtag = await bannedTagSystem.findOne({guildID:guild.id})
        const yasaklıtag = bannedtag ? bannedtag.only : false;
        const embed = new EmbedBuilder()
        .setAuthor({name:guild.name, iconURL:guild.iconURL()})
        .setFooter({text:"Developed By Luppux"})
        if((roles && roles.botRole) && member.user.bot){
             member.roles.add(roles.botRole);
            if(welcomeChannel) return  welcomeChannel.send({embed:[embed.setDescription(`${member} isimli bot sunucuya eklendi. kendisine <@&${roles.botRole}> (Bot) rolü verdim.`)]})
        }
        if (yasaklıtag == true && (bannedtag.symbolTags.some(tag => member.user.username.includes(tag)) || bannedtag.labelTags.some(tag => member.user.discriminator == tag))) {
             member.roles.add(roles.bannedTagRole)
            if(bannedTagChannel)  bannedTagChannel.send({ embeds: [embed.setDescription(`${member} isimli üye sunucuya katıldı fakat isminde yasaklı tag barındırdığından dolayı \`${new Date(Date.now()).toTurkishFormatDate()}\` tarihinde **yasaklı tag** olarak işaretlendi.`)] });
            return welcomeChannel.send({embeds:[embed.setDescription(`${member} isimli üye sunucuya katıldı fakat isminde yasaklı tag barındırdığından dolayı \`${new Date(Date.now()).toTurkishFormatDate()}\` tarihinde **yasaklı tag** olarak işaretlendi.`)]});
        };
        const kontrol = new Date().getTime() - member.user.createdAt.getTime() < 604800000 ? false : true
        if(welcomeChannel && kontrol == true){
            await member.roles.add(roles.unregisterRoles)
             const data = await tagsistem.findOne({guildID:guild.id});
             const a = data.only 
             const tag = `${a == true ? `${data.Type == "Public" ? `${member.user.username.includes(data.Tag) ? `${data.Tag}`:`${data.unTag}`}` :`${data.nameTags.some(x=> member.user.username.includes(x) || member.user.discriminator == data.NumberTag) ? `${data.Tag}`:`${data.unTag}`}`}` : ""}`
         
             member.setNickname(`${tag} İsim | Yaş`)
             welcomeChannel.send({
                content: `**${guild.name}** Sunucusuna hoşgeldin ${member} Seninle beraber Sunucumuz **${member.guild.memberCount}** Kullanıcı oldu  🎉
              
 Topluluk Kurallarımıza <#1070701865509060653> Kısmından Bakabilirsiniz. Kuralları okumuş ve kabul etmiş sayılıyorsunuz.
 
Hesabınız <t:${Math.floor(Math.floor(member.user.createdTimestamp) / 1000)}:f> Tarihinde Oluşturulmuş (**<t:${Math.floor(Math.floor(member.user.createdTimestamp) / 1000)}:R>**) <@&${roles.registerStaffRole}>

${Formatters.codeBlock("fix", `Kayıt edildikten sonra Topluluk kurallarını okumuş ve kabul etmiş sayılarak ceza-i işlem yapılıcaktır.`)}`})

        } else if (welcomeChannel && kontrol == false){
             member.roles.add(roles.suspectRole)
            return welcomeChannel.send({embeds:[embed.setDescription(`${member} isimli üye sunucuya katıldı fakat hesabı bir hafta içinde açılığından dolayı \`${new Date(Date.now()).toTurkishFormatDate()}\` tarihinde **şüpheli hesap** olarak işaretlendi.`)]});
        }
        else{
            console.log("guildMemberAdd Eventinde sorun var!")
        }

    } else{
            console.log("Sunucu Hatası ❌")
        }
    }
}

module.exports = guildMemberAdd
