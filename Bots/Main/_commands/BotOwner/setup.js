
const { EmbedBuilder,PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle,ModalBuilder ,TextInputStyle, SelectMenuBuilder,TextInputBuilder , Formatters} = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const guildConfig = require("../../../../Global/Database/Guild.Config")
const guildRoleConfig = require("../../../../Global/Database/Guild.Roles.Config")
const guildSystemConfig = require("../../../../Global/Database/SystemDB/GuildLevelSystem")
const guildChannelConfig = require("../../../../Global/Database/Guild.Channels.Config")
let BOTS = global.allBots = client.allBots = []
const {Bots,botStatus} = require("../../../../Global/Config/Guild").Guild
const { Client,GatewayIntentBits,Intents,Partials } = require('discord.js');

class Setup extends Command {
    constructor(client) {
        super(client, {
            name: "setup",
            description: "Sunucu Kurulumları içindir.",
            usage: ".setup",
            category: "Approval",
            aliases: ["kurulum"],

            enabled: true,
            guildOwner:true,
            developer : true
        });
    }
    // async     onLoad(client) {
    //     let allTokens = [Bots.mainToken,Bots.statToken,Bots.ProsecutorToken,Bots.guardOne,Bots.guardTwo,Bots.guardThree,...Bots.Dis]
    //     allTokens.forEach(async (token) => {
    //         let botClient;
    //             botClient = new Client({
    //                 intents: [32767],
    //                 presence: {activities: [{name:botStatus }], status: "dnd"}
    //               });
        
    //           botClient.on("ready", async () => {  
    //               BOTS.push(botClient)
    //           })
    //           await botClient.login(token).catch(err => {
    //           })
    //         })
    // }

   async onRequest (client, message, args,embed) {
    if(args[0] == "durum"){
        let guildconf = await guildConfig.findOne({guildID: message.guild.id})
        let guildroleconf = await guildRoleConfig.findOne({guildID: message.guild.id})
        let guildchannelconf = await guildChannelConfig.findOne({guildID: message.guild.id})
        let registerCommand = guildconf.registerCommands == true ? "🔓 (**Açık**)" : "🔒 (**Kapalı**)";
        let moderationCommand = guildconf.moderationCommands == true ? "🔓 (**Açık**)" : "🔒 (**Kapalı**)";
        let statisticsCommand = guildconf.statisticsCommands == true ? "🔓 (**Açık**)" : "🔒 (**Kapalı**)";
        let globalCommand = guildconf.globalCommands == true ? "🔓 (**Açık**)" : "🔒 (**Kapalı**)";
        let slashCommand = guildconf.slashCommands == true ? "🔓 (**Açık**)" : "🔒 (**Kapalı**)";
        let roller = `\`Kurucu Rolleri:\` ${guildroleconf ? guildroleconf.kurucuPerms.map(x=> `<@&${x}>`).join(", ") : "**AYARLANMADI**"}\n\`Üst Yönetim:\` ${guildroleconf ? guildroleconf.üstYönetimPerms.map(x=> `<@&${x}>`).join(", ") : "**AYARLANMADI**"}\n\`Orta Yönetim:\` ${guildroleconf ? guildroleconf.ortaYönetimPerms.map(x=> `<@&${x}>`).join(", ") : "**AYARLANMADI**"}\n\`Alt Yönetim:\` ${guildroleconf ? guildroleconf.altYönetimPerms.map(x=> `<@&${x}>`).join(", ") : "**AYARLANMADI**"}\n\`Kayıtsız Rolleri:\` ${guildroleconf ? guildroleconf.unregisterRoles.map(x=> `<@&${x}>`).join(", ") : "**AYARLANMADI**"}\n\`Erkek Rolleri:\` ${guildroleconf ? guildroleconf.manRoles.map(x=> `<@&${x}>`).join(", ") : "**AYARLANMADI**"}\n\`Kadın Rolleri:\` ${guildroleconf ? guildroleconf.womanRoles.map(x=> `<@&${x}>`).join(", ") : "**AYARLANMADI**"}\n\`Booster Rolü:\`${guildroleconf.boosterRole !=undefined ? `<@&${guildroleconf.boosterRole}>`:"**AYARLANMADI**"}\n\`Bot Commands:\` ${guildroleconf.botCommandsRole != undefined ? `<@&${guildroleconf.botCommandsRole}>` : "**AYARLANMADI**"}\n\`Register Staff:\` ${guildroleconf.registerStaffRole != undefined ? `<@&${guildroleconf.registerStaffRole}>` : "**AYARLANMADI**"}\n\`Ban Staff:\` ${guildroleconf.banStaffRole != undefined ? `<@&${guildroleconf.banStaffRole}>` : "**AYARLANMADI**"}\n\`Jail Staff:\` ${guildroleconf.jailedStaffRole != undefined ? `<@&${guildroleconf.jailedStaffRole}>` : "**AYARLANMADI**"}\n\`C-Mute Staff:\` ${guildroleconf.chatMuteStaffRole != undefined ? `<@&${guildroleconf.chatMuteStaffRole}>` : "**AYARLANMADI**"}\n\`V-Mute Staff:\` ${guildroleconf.voiceMuteStaffRole != undefined ? `<@&${guildroleconf.voiceMuteStaffRole}>` : "**AYARLANMADI**"}\n\`Şüpheli:\` ${guildroleconf.suspectRole != undefined ? `<@&${guildroleconf.suspectRole}>` : "**AYARLANMADI**"}\n\`Yasaklı Tag:\` ${guildroleconf.bannedTagRole != undefined ? `<@&${guildroleconf.bannedTagRole}>` : "**AYARLANMADI**"}\n\`Cezalı (Jailed):\` ${guildroleconf.jailedRole != undefined ? `<@&${guildroleconf.jailedRole}>` : "**AYARLANMADI**"}\n\`Bot Rolü:\` ${guildroleconf.botRole != undefined ? `<@&${guildroleconf.botRole}>` : "**AYARLANMADI**"}\n\`C-Muted:\` ${guildroleconf.chatMutedRole != undefined ? `<@&${guildroleconf.chatMutedRole}>` : "**AYARLANMADI**"}\n\`V-Muted:\` ${guildroleconf.voiceMutedRole != undefined ? `<@&${guildroleconf.voiceMutedRole}>` : "**AYARLANMADI**"}`
        let kanallar = `\`Hoşgeldin Kanalı:\`${guildchannelconf.welcomeChannel != undefined ? `<#${guildchannelconf.welcomeChannel}>` : "**AYARLANMADI**"}
        \`Şüpheli Hesap Log:\`${guildchannelconf.suspectLog != undefined ? `<#${guildchannelconf.suspectLog}>` : "**AYARLANMADI**"}
        \`Ban Log:\`${guildchannelconf.bannedLog != undefined ? `<#${guildchannelconf.bannedLog}>` : "**AYARLANMADI**"}
        \`Jailed Log:\`${guildchannelconf.jailedLog != undefined ? `<#${guildchannelconf.jailedLog}>` : "**AYARLANMADI**"}
        \`C-Muted Log:\`${guildchannelconf.cMutedLog != undefined ? `<#${guildchannelconf.cMutedLog}>` : "**AYARLANMADI**"}
        \`V-Muted Log:\`${guildchannelconf.vMutedLog != undefined ? `<#${guildchannelconf.vMutedLog}>` : "**AYARLANMADI**"}
        \`Davet Log:\`${guildchannelconf.inviteLog != undefined ? `<#${guildchannelconf.inviteLog}>` : "**AYARLANMADI**"}
        \`Ceza Puan:\`${guildchannelconf.penaltyPointsLog != undefined ? `<#${guildchannelconf.penaltyPointsLog}>` : "**AYARLANMADI**"}
        \`Chat (Genel Sohbet):\`${guildchannelconf.chatChannel != undefined ? `<#${guildchannelconf.chatChannel}>` : "**AYARLANMADI**"}`
        let komutkategorileri = `\`Register:\`${registerCommand}\n\`Moderation:\`${moderationCommand}\n\`Statistics:\`${statisticsCommand}\n\`Global:\`${globalCommand}\n\`Slash:\`${slashCommand}`
        let msg = await message.channel.send({embeds:[new EmbedBuilder().setDescription("Aşağıda butonlardan birine tıklayınız.")],components:[new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId("komut").setLabel("Komutlar").setStyle(ButtonStyle.Primary),new ButtonBuilder().setCustomId("rol").setLabel("Roller").setStyle(ButtonStyle.Primary),new ButtonBuilder().setCustomId("kanal").setLabel("Kanallar").setStyle(ButtonStyle.Primary))]})
        const filter = d => d.user.id == message.member.id 
        const collector = msg.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
        collector.on('collect', async (d) => {
            if(d.customId == "komut") {
                d.reply({content:"Komut Kategori Ayarları Gösteriliyor.", ephemeral:true})
                await msg.edit({embeds:[new EmbedBuilder().setDescription(komutkategorileri)]})
            }
            if(d.customId == "rol") {
                d.reply({content:"Rol Ayarları Gösteriliyor.", ephemeral:true})
                await msg.edit({embeds:[new EmbedBuilder().setDescription(roller)]})

            }
            if(d.customId == "kanal") {
                d.reply({content:"Kanal Ayarları Gösteriliyor.", ephemeral:true})
                await msg.edit({embeds:[new EmbedBuilder().setDescription(kanallar)]})

            }
        })
    }
    if(!args[0]) {
    const row = new ActionRowBuilder()
    .addComponents(
        new SelectMenuBuilder()
        .setPlaceholder("Bir işlem seçiniz!")
        .setCustomId("kurulum")
        .setOptions([
            {value:"komut",description:"Komut kategori kilitlerini buradan ayarlayabilirsin.", label:"Komut Ayarları",emoji:{name:"⚙"}},
            {value:"rol",description:"Rol ayarlarını buradan yapabilirsin", label:"Rol Ayaları",emoji:{name:"⚙"}},
            {value:"kanal",description:"Kanal ayarlarını buradan yapabilirsiniz.", label:"Kanal Ayarları",emoji:{name:"⚙"}},
            {value:"sistem",description:"Sunucunuzda kullanmak istediğiniz sistemleri tıklayarak ayarlayabilir/bakabilirsiniz.", label:"Sistem Ayarları",emoji:{name:"⚙"}},
            {value:"bot",description:"Bot ayarlarını buradan yapabilirsin", label:"Bot Ayarları",emoji:{name:"🤖"}},
        ])
    )
   let x = await message.channel.send({embeds:[
        new EmbedBuilder()
        .setAuthor({name:message.guild.name, iconURL: message.guild.iconURL({dynamic:true})})
        .setDescription(`${message.member} Sunucu kurulumuna hoşgeldin, Aşağıda bulunan butonlardan yapmak istediğin ayarın panelini açabilirsin.`)
        .setFooter({text:`Developed By Luppux`, iconURL:"https://cdn.discordapp.com/avatars/852800814808694814/ebbfb60a934c72b3c730a6ab695f28e7.webp"})
    ], components:[row]})
    const filter = i => i.user.id == message.member.id 
    const collector = x.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
    collector.on('collect', async (i) => {
        if(i.values[0] == "komut") {

            i.reply({content:"Komut ayarlarını yapmak için butonları kullanın.",ephemeral:true})
            const guildSettings = await guildConfig.findOne({guildID: message.guild.id});
            var registerCommand = guildSettings.registerCommands == true ? "🔓 (**Açık**)" : "🔒 (**Kapalı**)";
            var moderationCommand = guildSettings.moderationCommands == true ? "🔓 (**Açık**)" : "🔒 (**Kapalı**)";
            var statisticsCommand = guildSettings.statisticsCommands == true ? "🔓 (**Açık**)" : "🔒 (**Kapalı**)";
            var globalCommand = guildSettings.globalCommands == true ? "🔓 (**Açık**)" : "🔒 (**Kapalı**)";
            var slashCommand = guildSettings.slashCommands == true ? "🔓 (**Açık**)" : "🔒 (**Kapalı**)";
            let globalbutton; let registerbutton; let moderationbuttton; let statisticsbutton; let slashbutton;
            const row = new ActionRowBuilder()
            .addComponents(
                globalbutton=  new ButtonBuilder()
                .setCustomId("global")
                .setLabel("Global")
                .setStyle(guildSettings.globalCommands == true ? ButtonStyle.Success : ButtonStyle.Secondary)
                .setEmoji(guildSettings.globalCommands == true ? "🔓" : "🔒"),
                registerbutton= new ButtonBuilder()
                .setCustomId("register")
                .setLabel("Register")
                .setEmoji(guildSettings.registerCommands == true ? "🔓" : "🔒")
                .setStyle(guildSettings.registerCommands == true ? ButtonStyle.Success : ButtonStyle.Secondary),
                moderationbuttton=  new ButtonBuilder()
                .setCustomId("moderation")
                .setLabel("Moderation")
                .setEmoji(guildSettings.moderationCommands == true ? "🔓" : "🔒")
                .setStyle(guildSettings.moderationCommands == true ? ButtonStyle.Success : ButtonStyle.Secondary),
                statisticsbutton=  new ButtonBuilder()
                .setCustomId("stat")
                .setLabel("Statistics")
                .setEmoji(guildSettings.statisticsCommands == true ? "🔓" : "🔒")
                .setStyle(guildSettings.statisticsCommands == true ? ButtonStyle.Success : ButtonStyle.Secondary),
                slashbutton=  new ButtonBuilder()
                .setCustomId("slash")
                .setLabel("Slash (/)")
                .setEmoji(guildSettings.slashCommands == true ? "🔓" : "🔒")
                .setStyle(guildSettings.slashCommands == true ? ButtonStyle.Success : ButtonStyle.Secondary),
            )
            var commandsembed;
            i.channel.send({components:[row],embeds:[
                commandsembed=  new EmbedBuilder()
                .setAuthor({name:i.guild.name, iconURL: i.guild.iconURL({dynamic:true})})
                .setDescription(`${i.member} Sunucu kurulumunun komut açma aşamasına hoşgeldin, burada kullanılıcaklar komutların kilidini açabilirsin.`)
                .addFields( 
                    {name:"__Komut Kategorileri;__",value:`Global Commands: ${globalCommand}\nSlash (/) Commands: ${slashCommand}\nStats Commands: ${statisticsCommand}\nModeration Commands: ${moderationCommand}\nRegister Commands: ${registerCommand} ${Formatters.codeBlock("md",`# Komut kategorilerinin içeriklerini görmek için ".yardım" komutunu kullanabilirsiniz.`)}`,inline:true},
        
                )
            ]})
            .then(async commandsConfigMSG => {
                const filter = c => c.user.id == message.member.id 
                const collector = commandsConfigMSG.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
                collector.on('collect', async (c) => {
                    if(c.customId == "global") {
                        const guildSetting = await guildConfig.findOne({guildID: message.guild.id});
                        var aktif = guildSetting ? guildSetting.globalCommands : false
                        if( aktif == false ) {
                            await guildConfig.findOneAndUpdate({guildID: message.guild.id}, {$set:{globalCommands:true}},{upsert:true});
                            globalCommand = "🔓 (**Açık**)";
                            await commandsConfigMSG.edit({embeds:[new EmbedBuilder()
                                .setAuthor({name:i.guild.name, iconURL: i.guild.iconURL({dynamic:true})})
                                .setDescription(`${i.member} Sunucu kurulumunun komut açma aşamasına hoşgeldin, burada kullanılıcaklar komutların kilidini açabilirsin.`)
                                .addFields( 
                                    {name:"__Komut Kategorileri;__",value:`Global Commands: ${globalCommand}\nSlash (/) Commands: ${slashCommand}\nStats Commands: ${statisticsCommand}\nModeration Commands: ${moderationCommand}\nRegister Commands: ${registerCommand} ${Formatters.codeBlock("md",`# Komut kategorilerinin içeriklerini görmek için ".yardım" komutunu kullanabilirsiniz.`)}`,inline:true},
                        
                                )],components:[new ActionRowBuilder().addComponents([globalbutton.setEmoji("🔓").setStyle(ButtonStyle.Success),registerbutton,moderationbuttton,statisticsbutton,slashbutton])]})
                            c.reply({content:"**Global Commands** Kategorisi Aktif edildi.", ephemeral:true})
                        } else if(aktif == true ){
                            await guildConfig.findOneAndUpdate({guildID: message.guild.id}, {$set:{globalCommands:false}},{upsert:true});
                            globalCommand = "🔒 (**Kapalı**)";
                            await commandsConfigMSG.edit({embeds:[new EmbedBuilder()
                                .setAuthor({name:i.guild.name, iconURL: i.guild.iconURL({dynamic:true})})
                                .setDescription(`${i.member} Sunucu kurulumunun komut açma aşamasına hoşgeldin, burada kullanılıcaklar komutların kilidini açabilirsin.`)
                                .addFields( 
                                    {name:"__Komut Kategorileri;__",value:`Global Commands: ${globalCommand}\nSlash (/) Commands: ${slashCommand}\nStats Commands: ${statisticsCommand}\nModeration Commands: ${moderationCommand}\nRegister Commands: ${registerCommand} ${Formatters.codeBlock("md",`# Komut kategorilerinin içeriklerini görmek için ".yardım" komutunu kullanabilirsiniz.`)}`,inline:true},
                        
                                )],components:[new ActionRowBuilder().addComponents([globalbutton.setEmoji("🔒").setStyle(ButtonStyle.Secondary),registerbutton,moderationbuttton,statisticsbutton,slashbutton])]})
                            c.reply({content:"**Global Commands** Kategorisi Deaktif edildi.", ephemeral:true}) 
                        }

                    }
                    if(c.customId == "register") {
                        const guildSetting = await guildConfig.findOne({guildID: message.guild.id});
                        var aktif = guildSetting ? guildSetting.registerCommands : false
                        if( aktif == false ) {
                            await guildConfig.findOneAndUpdate({guildID: message.guild.id}, {$set:{registerCommands:true}},{upsert:true});
                            registerCommand = "🔓 (**Açık**)";
                            await commandsConfigMSG.edit({embeds:[new EmbedBuilder()
                                .setAuthor({name:i.guild.name, iconURL: i.guild.iconURL({dynamic:true})})
                                .setDescription(`${i.member} Sunucu kurulumunun komut açma aşamasına hoşgeldin, burada kullanılıcaklar komutların kilidini açabilirsin.`)
                                .addFields( 
                                    {name:"__Komut Kategorileri;__",value:`Global Commands: ${globalCommand}\nSlash (/) Commands: ${slashCommand}\nStats Commands: ${statisticsCommand}\nModeration Commands: ${moderationCommand}\nRegister Commands: ${registerCommand} ${Formatters.codeBlock("md",`# Komut kategorilerinin içeriklerini görmek için ".yardım" komutunu kullanabilirsiniz.`)}`,inline:true},
                        
                                )],components:[new ActionRowBuilder().addComponents([globalbutton,registerbutton.setEmoji("🔓").setStyle(ButtonStyle.Success),moderationbuttton,statisticsbutton,slashbutton])]})
                            c.reply({content:"**Register Commands** Kategorisi Aktif edildi.", ephemeral:true})
                        } else if(aktif == true ){
                            await guildConfig.findOneAndUpdate({guildID: message.guild.id}, {$set:{registerCommands:false}},{upsert:true});
                            registerCommand = "🔒 (**Kapalı**)";

                            await commandsConfigMSG.edit({embeds:[new EmbedBuilder()
                                .setAuthor({name:i.guild.name, iconURL: i.guild.iconURL({dynamic:true})})
                                .setDescription(`${i.member} Sunucu kurulumunun komut açma aşamasına hoşgeldin, burada kullanılıcaklar komutların kilidini açabilirsin.`)
                                .addFields( 
                                    {name:"__Komut Kategorileri;__",value:`Global Commands: ${globalCommand}\nSlash (/) Commands: ${slashCommand}\nStats Commands: ${statisticsCommand}\nModeration Commands: ${moderationCommand}\nRegister Commands: ${registerCommand} ${Formatters.codeBlock("md",`# Komut kategorilerinin içeriklerini görmek için ".yardım" komutunu kullanabilirsiniz.`)}`,inline:true},
                        
                                )],components:[new ActionRowBuilder().addComponents([globalbutton,registerbutton.setEmoji("🔒").setStyle(ButtonStyle.Secondary),moderationbuttton,statisticsbutton,slashbutton])]})
                            c.reply({content:"**Register Commands** Kategorisi Deaktif edildi.", ephemeral:true}) 
                        }

                    }     
                    if(c.customId == "moderation") {
                        const guildSetting = await guildConfig.findOne({guildID: message.guild.id});
                        var aktif = guildSetting ? guildSetting.moderationCommands : false
                        if( aktif == false ) {
                            await guildConfig.findOneAndUpdate({guildID: message.guild.id}, {$set:{moderationCommands:true}},{upsert:true});
                            moderationCommand = "🔓 (**Açık**)";
                            await commandsConfigMSG.edit({embeds:[new EmbedBuilder()
                                .setAuthor({name:i.guild.name, iconURL: i.guild.iconURL({dynamic:true})})
                                .setDescription(`${i.member} Sunucu kurulumunun komut açma aşamasına hoşgeldin, burada kullanılıcaklar komutların kilidini açabilirsin.`)
                                .addFields( 
                                    {name:"__Komut Kategorileri;__",value:`Global Commands: ${globalCommand}\nSlash (/) Commands: ${slashCommand}\nStats Commands: ${statisticsCommand}\nModeration Commands: ${moderationCommand}\nRegister Commands: ${registerCommand} ${Formatters.codeBlock("md",`# Komut kategorilerinin içeriklerini görmek için ".yardım" komutunu kullanabilirsiniz.`)}`,inline:true},
                        
                                )],components:[new ActionRowBuilder().addComponents([globalbutton,registerbutton,moderationbuttton.setEmoji("🔓").setStyle(ButtonStyle.Success),statisticsbutton,slashbutton])]})
                            c.reply({content:"**Moderation Commands** Kategorisi Aktif edildi.", ephemeral:true})
                        } else if(aktif == true ){
                            await guildConfig.findOneAndUpdate({guildID: message.guild.id}, {$set:{moderationCommands:false}},{upsert:true});
                            moderationCommand =  "🔒 (**Kapalı**)";
                            await commandsConfigMSG.edit({embeds:[new EmbedBuilder()
                                .setAuthor({name:i.guild.name, iconURL: i.guild.iconURL({dynamic:true})})
                                .setDescription(`${i.member} Sunucu kurulumunun komut açma aşamasına hoşgeldin, burada kullanılıcaklar komutların kilidini açabilirsin.`)
                                .addFields( 
                                    {name:"__Komut Kategorileri;__",value:`Global Commands: ${globalCommand}\nSlash (/) Commands: ${slashCommand}\nStats Commands: ${statisticsCommand}\nModeration Commands: ${moderationCommand}\nRegister Commands: ${registerCommand} ${Formatters.codeBlock("md",`# Komut kategorilerinin içeriklerini görmek için ".yardım" komutunu kullanabilirsiniz.`)}`,inline:true},
                        
                                )],components:[new ActionRowBuilder().addComponents([globalbutton,registerbutton,moderationbuttton.setEmoji("🔒").setStyle(ButtonStyle.Secondary),statisticsbutton,slashbutton])]})
                            c.reply({content:"**Moderation Commands** Kategorisi Deaktif edildi.", ephemeral:true}) 
                        }

                    }  
                    if(c.customId == "stat") {
                        const guildSetting = await guildConfig.findOne({guildID: message.guild.id});
                        var aktif = guildSetting ? guildSetting.statisticsCommands : false
                        if( aktif == false ) {
                            await guildConfig.findOneAndUpdate({guildID: message.guild.id}, {$set:{statisticsCommands:true}},{upsert:true});
                            statisticsCommand = "🔓 (**Açık**)";

                            await commandsConfigMSG.edit({embeds:[new EmbedBuilder()
                                .setAuthor({name:i.guild.name, iconURL: i.guild.iconURL({dynamic:true})})
                                .setDescription(`${i.member} Sunucu kurulumunun komut açma aşamasına hoşgeldin, burada kullanılıcaklar komutların kilidini açabilirsin.`)
                                .addFields( 
                                    {name:"__Komut Kategorileri;__",value:`Global Commands: ${globalCommand}\nSlash (/) Commands: ${slashCommand}\nStats Commands: ${statisticsCommand}\nModeration Commands: ${moderationCommand}\nRegister Commands: ${registerCommand} ${Formatters.codeBlock("md",`# Komut kategorilerinin içeriklerini görmek için ".yardım" komutunu kullanabilirsiniz.`)}`,inline:true},
                        
                                )],components:[new ActionRowBuilder().addComponents([globalbutton,registerbutton,moderationbuttton,statisticsbutton.setEmoji("🔓").setStyle(ButtonStyle.Success),slashbutton])]})
                            c.reply({content:"**Statistics Commands** Kategorisi Aktif edildi.", ephemeral:true})
                        } else if(aktif == true ){
                            await guildConfig.findOneAndUpdate({guildID: message.guild.id}, {$set:{statisticsCommands:false}},{upsert:true});
                            statisticsCommand =  "🔒 (**Kapalı**)";

                            await commandsConfigMSG.edit({embeds:[new EmbedBuilder()
                                .setAuthor({name:i.guild.name, iconURL: i.guild.iconURL({dynamic:true})})
                                .setDescription(`${i.member} Sunucu kurulumunun komut açma aşamasına hoşgeldin, burada kullanılıcaklar komutların kilidini açabilirsin.`)
                                .addFields( 
                                    {name:"__Komut Kategorileri;__",value:`Global Commands: ${globalCommand}\nSlash (/) Commands: ${slashCommand}\nStats Commands: ${statisticsCommand}\nModeration Commands: ${moderationCommand}\nRegister Commands: ${registerCommand} ${Formatters.codeBlock("md",`# Komut kategorilerinin içeriklerini görmek için ".yardım" komutunu kullanabilirsiniz.`)}`,inline:true},
                        
                                )],components:[new ActionRowBuilder().addComponents([globalbutton,registerbutton,moderationbuttton,statisticsbutton.setEmoji("🔒").setStyle(ButtonStyle.Secondary),slashbutton])]})
                            c.reply({content:"**Statistics Commands** Kategorisi Deaktif edildi.", ephemeral:true}) 
                        }

                    }      
                    if(c.customId == "slash") {
                        const guildSetting = await guildConfig.findOne({guildID: message.guild.id});
                        var aktif = guildSetting ? guildSetting.slashCommands : false
                        if( aktif == false ) {
                            await guildConfig.findOneAndUpdate({guildID: message.guild.id}, {$set:{slashCommands:true}},{upsert:true});
                            slashCommand = "🔓 (**Açık**)";

                            await commandsConfigMSG.edit({embeds:[new EmbedBuilder()
                                .setAuthor({name:i.guild.name, iconURL: i.guild.iconURL({dynamic:true})})
                                .setDescription(`${i.member} Sunucu kurulumunun komut açma aşamasına hoşgeldin, burada kullanılıcaklar komutların kilidini açabilirsin.`)
                                .addFields( 
                                    {name:"__Komut Kategorileri;__",value:`Global Commands: ${globalCommand}\nSlash (/) Commands: ${slashCommand}\nStats Commands: ${statisticsCommand}\nModeration Commands: ${moderationCommand}\nRegister Commands: ${registerCommand} ${Formatters.codeBlock("md",`# Komut kategorilerinin içeriklerini görmek için ".yardım" komutunu kullanabilirsiniz.`)}`,inline:true},
                        
                                )],components:[new ActionRowBuilder().addComponents([globalbutton,registerbutton,moderationbuttton,statisticsbutton,slashbutton.setEmoji("🔓").setStyle(ButtonStyle.Success)])]})
                            c.reply({content:"**Slash (/) Commands** Kategorisi Aktif edildi.", ephemeral:true})
                        } else if(aktif == true ){
                            await guildConfig.findOneAndUpdate({guildID: message.guild.id}, {$set:{slashCommands:false}},{upsert:true});
                            slashCommand =  "🔒 (**Kapalı**)";

                            await commandsConfigMSG.edit({embeds:[new EmbedBuilder()
                                .setAuthor({name:i.guild.name, iconURL: i.guild.iconURL({dynamic:true})})
                                .setDescription(`${i.member} Sunucu kurulumunun komut açma aşamasına hoşgeldin, burada kullanılıcaklar komutların kilidini açabilirsin.`)
                                .addFields( 
                                    {name:"__Komut Kategorileri;__",value:`Global Commands: ${globalCommand}\nSlash (/) Commands: ${slashCommand}\nStats Commands: ${statisticsCommand}\nModeration Commands: ${moderationCommand}\nRegister Commands: ${registerCommand} ${Formatters.codeBlock("md",`# Komut kategorilerinin içeriklerini görmek için ".yardım" komutunu kullanabilirsiniz.`)}`,inline:true},
                        
                                )],components:[new ActionRowBuilder().addComponents([globalbutton,registerbutton,moderationbuttton,statisticsbutton,slashbutton.setEmoji("🔒").setStyle(ButtonStyle.Secondary)])]})
                            c.reply({content:"**Slash (/) Commands** Kategorisi Deaktif edildi.", ephemeral:true}) 
                        }

                    }                                                                       
                })
            })
        }
        if(i.values[0] == "rol"){
            i.reply({content:"Rol ayarlamalarını aşağıda gösterildiği gibi yapabilirsin.",ephemeral:true});
         const menu = new ActionRowBuilder()
         .addComponents(
            new SelectMenuBuilder()
            .setCustomId("roleconfig")
            .setPlaceholder("Ayarlamak istediğiniz rolü menüden seçin")
            .setOptions([
                {label:"Kayıtsız", description:"Kayıtsız Rollerini ayarlamak için tıklayın", value:"unregister"},
                {label:"Erkek Rolleri", description:"Erkek Rollerini ayarlamak için tıklayın", value:"erkek"},
                {label:"Kadın Rolleri", description:"Kadın Rollerini ayarlamak için tıklayın", value:"kadin"},
                {label:"Booster Rolü", description:"Booster rolünü ayarlamak için tıklayın", value:"booster"},
                {label:"Kayıt Görevlisi", description:"Kayıt Görevlisi rolünü ayarlamak için tıklayın", value:"register"},
                {label:"C-Mute Görevlisi", description:"C-Mute Görevlisi rolünü ayarlamak için tıklayın", value:"cmute"},
                {label:"V-Mute Görevlisi", description:"V-Mute Görevlisi rolünü ayarlamak için tıklayın", value:"vmute"},
                {label:"Ban Görevlisi", description:"Ban Görevlisi rolünü ayarlamak için tıklayın", value:"ban"},
                {label:"Jail Görevlisi", description:"Jail Görevlisi rolünü ayarlamak için tıklayın", value:"jail"},
                {label:"Bot Command Görevlisi", description:"Bot Commands Rolünü ayarlamak için tıklayın", value:"botcommand"},
                {label:"Şüpheli Kullanıcı Rolü", description:"Şüpheli Kullanıcı Rolünü ayarlamak için tıklayın", value:"supheli"},
                {label:"Cezalı Rolü", description:"Cezalı Rolünü ayarlamak için tıklayın", value:"cezali"},
                {label:"Yasaklı Tag Rolü", description:"Yasaklı Tag Rolünü ayarlamak için tıklayın", value:"yasaktag"},
                {label:"Bot Rolü", description:"Bot Rolü ayarlamak için tıklayın", value:"botrol"},
                {label:"C-Muted Rolü", description:"C-Muted Rolünü ayarlamak için tıklayın", value:"cmuted"},
                {label:"V-Muted Rolü", description:"V-Muted Rolünü ayarlamak için tıklayın", value:"vmuted"},
                {label:"Kurucu Rolleri", description:"Kurucu Rollerini ayarlamak için tıklayın", value:"kurucurolleri"},
                {label:"Üst Yönetim Rolleri", description:"ÜSt Yönetim Rollerini ayarlamak için tıklayın", value:"ustyonetim"},
                {label:"Orta Yönetim Rolleri", description:"Orta Yönetim Rollerini ayarlamak için tıklayın", value:"ortayonetim"},
                {label:"Alt Yönetim Rolleri", description:"Alt Yönetim Rollerini ayarlamak için tıklayın", value:"altyonetim"},

            ])
         )   
         i.channel.send({components:[menu],embeds:[new EmbedBuilder().setAuthor({name:i.guild.name, iconURL: i.guild.iconURL({dynamic:true})}).setDescription("Ayarlamak istediğiniz rol(leri) aşağıdaki menüden seçin.")]}).then(async rolsetupMsg =>{
            const filter = c => c.user.id == message.member.id 
            const collector = rolsetupMsg.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
            collector.on('collect', async (r) => {
                if(r.values[0] == "unregister"){
                    let liste = [];
                    r.guild.roles.cache.sort((a,b)=> b.rawPosition - a.rawPosition).filter(x=> x.id != r.guild.id && !x.botRole && !x.name.includes("━")).forEach(x => {liste.push({roleName: x.name, roleId: x.id})});
                    let list = chunkify(liste,25);
                    let menu = []
                    for (let i = 0; i < list.length; i++) {
                        let e = list[i]
                        let menuliste = [];
                        e.forEach(x=> {menuliste.push({label:x.roleName, description:`${x.roleId}`, value: `${x.roleId}`}) })
                        menu.push( new SelectMenuBuilder().setMinValues(1).setMaxValues(4).setCustomId("menu"+i).setPlaceholder(`${i+1}. Rol Listesi`).addOptions(menuliste) )
                        menuliste = [];
                    }
                    let rows = [];
                    menu.forEach(x=> rows.push(new ActionRowBuilder().addComponents(x)))
                    r.reply({content:"Aşağıda gelen menü(ler)den İstediğiniz rolleri seçiniz.", ephemeral:true})
                    r.channel.send({components:rows,content:"Aşağıda bulunan menülerden ayarlamak istediğiniz rolleri seçiniz."}).then(async registersetup=> {
                        const filter = rs => rs.user.id == message.member.id 
                        const collector = registersetup.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
                        collector.on('collect', async (rs) => {
                            var role = []
                            for (let index = 0; index < rs.values.length; index++) {
                              let ids = rs.values[index]
                              role.push(ids)
                            }
                            await guildRoleConfig.findOneAndUpdate({guildID: rs.guild.id}, {$set:{unregisterRoles:role}},{upsert:true})
                            rs.reply({content:`${role.map(x=> `<@&${x}>`).join(", ")} Rol(leri/ü) **Unregister Roles** olarak ayarlandı.`, ephemeral:true})
                            if(registersetup) registersetup.delete();
                        })
                    })
                
                }
                if(r.values[0] == "erkek"){
                    let liste = [];
                    r.guild.roles.cache.sort((a,b)=> b.rawPosition - a.rawPosition).filter(x=> x.id != r.guild.id && !x.botRole && !x.name.includes("━")).forEach(x => {liste.push({roleName: x.name, roleId: x.id})});
                    let list = chunkify(liste,25);
                    let menu = []
                    for (let i = 0; i < list.length; i++) {
                        let e = list[i]
                        let menuliste = [];
                        e.forEach(x=> {menuliste.push({label:x.roleName, description:`${x.roleId}`, value: `${x.roleId}`}) })
                        menu.push( new SelectMenuBuilder().setMinValues(1).setMaxValues(4).setCustomId("menu"+i).setPlaceholder(`${i+1}. Rol Listesi`).addOptions(menuliste) )
                        menuliste = [];
                    }
                    let rows = [];
                    menu.forEach(x=> rows.push(new ActionRowBuilder().addComponents(x)))
                    r.reply({content:"Aşağıda gelen menü(ler)den İstediğiniz rolleri seçiniz.", ephemeral:true})
                    r.channel.send({components:rows,content:"Aşağıda bulunan menülerden ayarlamak istediğiniz rolleri seçiniz."}).then(async registersetup=> {
                        const filter = rs => rs.user.id == message.member.id 
                        const collector = registersetup.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
                        collector.on('collect', async (rs) => {
                            var role = []
                            for (let index = 0; index < rs.values.length; index++) {
                              let ids = rs.values[index]
                              role.push(ids)
                            }
                            await guildRoleConfig.findOneAndUpdate({guildID: rs.guild.id}, {$set:{manRoles:role}},{upsert:true})
                            rs.reply({content:`${role.map(x=> `<@&${x}>`).join(", ")} Rol(leri/ü) **Man Roles** olarak ayarlandı.`, ephemeral:true})
                            if(registersetup) registersetup.delete();
                        })
                    })
                
                }
                if(r.values[0] == "kadin"){
                    let liste = [];
                    r.guild.roles.cache.sort((a,b)=> b.rawPosition - a.rawPosition).filter(x=> x.id != r.guild.id && !x.botRole && !x.name.includes("━")).forEach(x => {liste.push({roleName: x.name, roleId: x.id})});
                    let list = chunkify(liste,25);
                    let menu = []
                    for (let i = 0; i < list.length; i++) {
                        let e = list[i]
                        let menuliste = [];
                        e.forEach(x=> {menuliste.push({label:x.roleName, description:`${x.roleId}`, value: `${x.roleId}`}) })
                        menu.push( new SelectMenuBuilder().setMinValues(1).setMaxValues(4).setCustomId("menu"+i).setPlaceholder(`${i+1}. Rol Listesi`).addOptions(menuliste) )
                        menuliste = [];
                    }
                    let rows = [];
                    menu.forEach(x=> rows.push(new ActionRowBuilder().addComponents(x)))
                    r.reply({content:"Aşağıda gelen menü(ler)den İstediğiniz rolleri seçiniz.", ephemeral:true})
                    r.channel.send({components:rows,content:"Aşağıda bulunan menülerden ayarlamak istediğiniz rolleri seçiniz."}).then(async registersetup=> {
                        const filter = rs => rs.user.id == message.member.id 
                        const collector = registersetup.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
                        collector.on('collect', async (rs) => {
                            var role = []
                            for (let index = 0; index < rs.values.length; index++) {
                              let ids = rs.values[index]
                              role.push(ids)
                            }
                            await guildRoleConfig.findOneAndUpdate({guildID: rs.guild.id}, {$set:{womanRoles:role}},{upsert:true})
                            rs.reply({content:`${role.map(x=> `<@&${x}>`).join(", ")} Rol(leri/ü) **Woman Roles** olarak ayarlandı.`, ephemeral:true})
                            if(registersetup) registersetup.delete();
                        })
                    })
                
                }
                if(r.values[0] == "register"){
                    let liste = [];
                    r.guild.roles.cache.sort((a,b)=> b.rawPosition - a.rawPosition).filter(x=> x.id != r.guild.id && !x.botRole && !x.name.includes("━")).forEach(x => {liste.push({roleName: x.name, roleId: x.id})});
                    let list = chunkify(liste,25);
                    let menu = []
                    for (let i = 0; i < list.length; i++) {
                        let e = list[i]
                        let menuliste = [];
                        e.forEach(x=> {menuliste.push({label:x.roleName, description:`${x.roleId}`, value: `${x.roleId}`}) })
                        menu.push( new SelectMenuBuilder().setMinValues(1).setMaxValues(4).setCustomId("menu"+i).setPlaceholder(`${i+1}. Rol Listesi`).addOptions(menuliste) )
                        menuliste = [];
                    }
                    let rows = [];
                    menu.forEach(x=> rows.push(new ActionRowBuilder().addComponents(x)))
                    r.reply({content:"Aşağıda gelen menü(ler)den İstediğiniz rolleri seçiniz.", ephemeral:true})
                    r.channel.send({components:rows,content:"Aşağıda bulunan menülerden ayarlamak istediğiniz rolleri seçiniz."}).then(async registersetup=> {
                        const filter = rs => rs.user.id == message.member.id 
                        const collector = registersetup.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
                        collector.on('collect', async (rs) => {
                            var role = rs.values[0]
                            await guildRoleConfig.findOneAndUpdate({guildID: rs.guild.id}, {$set:{registerStaffRole:role}},{upsert:true})
                            rs.reply({content:`<@&${role}> Rolü **Register Staff** olarak ayarlandı.`, ephemeral:true})
                            if(registersetup) registersetup.delete();
                        })
                    })
                }
                if(r.values[0] == "booster"){
                    let liste = [];
                    r.guild.roles.cache.sort((a,b)=> b.rawPosition - a.rawPosition).filter(x=> x.id != r.guild.id && !x.botRole && !x.name.includes("━")).forEach(x => {liste.push({roleName: x.name, roleId: x.id})});
                    let list = chunkify(liste,25);
                    let menu = []
                    for (let i = 0; i < list.length; i++) {
                        let e = list[i]
                        let menuliste = [];
                        e.forEach(x=> {menuliste.push({label:x.roleName, description:`${x.roleId}`, value: `${x.roleId}`}) })
                        menu.push( new SelectMenuBuilder().setMinValues(1).setMaxValues(4).setCustomId("menu"+i).setPlaceholder(`${i+1}. Rol Listesi`).addOptions(menuliste) )
                        menuliste = [];
                    }
                    let rows = [];
                    menu.forEach(x=> rows.push(new ActionRowBuilder().addComponents(x)))
                    r.reply({content:"Aşağıda gelen menü(ler)den İstediğiniz rolleri seçiniz.", ephemeral:true})
                    r.channel.send({components:rows,content:"Aşağıda bulunan menülerden ayarlamak istediğiniz rolleri seçiniz."}).then(async registersetup=> {
                        const filter = rs => rs.user.id == message.member.id 
                        const collector = registersetup.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
                        collector.on('collect', async (rs) => {
                            var role = rs.values[0]
                            await guildRoleConfig.findOneAndUpdate({guildID: rs.guild.id}, {$set:{boosterRole:role}},{upsert:true})
                            rs.reply({content:`<@&${role}> Rolü **Booster** olarak ayarlandı.`, ephemeral:true})
                            if(registersetup) registersetup.delete();
                        })
                    })
                }
                if(r.values[0] == "cmute"){
                    let liste = [];
                    r.guild.roles.cache.sort((a,b)=> b.rawPosition - a.rawPosition).filter(x=> x.id != r.guild.id && !x.botRole && !x.name.includes("━")).forEach(x => {liste.push({roleName: x.name, roleId: x.id})});
                    let list = chunkify(liste,25);
                    let menu = []
                    for (let i = 0; i < list.length; i++) {
                        let e = list[i]
                        let menuliste = [];
                        e.forEach(x=> {menuliste.push({label:x.roleName, description:`${x.roleId}`, value: `${x.roleId}`}) })
                        menu.push( new SelectMenuBuilder().setMinValues(1).setMaxValues(4).setCustomId("menu"+i).setPlaceholder(`${i+1}. Rol Listesi`).addOptions(menuliste) )
                        menuliste = [];
                    }
                    let rows = [];
                    menu.forEach(x=> rows.push(new ActionRowBuilder().addComponents(x)))
                    r.reply({content:"Aşağıda gelen menü(ler)den İstediğiniz rolleri seçiniz.", ephemeral:true})
                    r.channel.send({components:rows,content:"Aşağıda bulunan menülerden ayarlamak istediğiniz rolleri seçiniz."}).then(async registersetup=> {
                        const filter = rs => rs.user.id == message.member.id 
                        const collector = registersetup.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
                        collector.on('collect', async (rs) => {
                            var role = rs.values[0]
                            await guildRoleConfig.findOneAndUpdate({guildID: rs.guild.id}, {$set:{chatMuteStaffRole:role}},{upsert:true})
                            rs.reply({content:`<@&${role}> Rolü **C-Mute Staff** olarak ayarlandı.`, ephemeral:true})
                            if(registersetup) registersetup.delete();
                        })
                    })
                }
                if(r.values[0] == "vmute"){
                    let liste = [];
                    r.guild.roles.cache.sort((a,b)=> b.rawPosition - a.rawPosition).filter(x=> x.id != r.guild.id && !x.botRole && !x.name.includes("━")).forEach(x => {liste.push({roleName: x.name, roleId: x.id})});
                    let list = chunkify(liste,25);
                    let menu = []
                    for (let i = 0; i < list.length; i++) {
                        let e = list[i]
                        let menuliste = [];
                        e.forEach(x=> {menuliste.push({label:x.roleName, description:`${x.roleId}`, value: `${x.roleId}`}) })
                        menu.push( new SelectMenuBuilder().setMinValues(1).setMaxValues(4).setCustomId("menu"+i).setPlaceholder(`${i+1}. Rol Listesi`).addOptions(menuliste) )
                        menuliste = [];
                    }
                    let rows = [];
                    menu.forEach(x=> rows.push(new ActionRowBuilder().addComponents(x)))
                    r.reply({content:"Aşağıda gelen menü(ler)den İstediğiniz rolleri seçiniz.", ephemeral:true})
                    r.channel.send({components:rows,content:"Aşağıda bulunan menülerden ayarlamak istediğiniz rolleri seçiniz."}).then(async registersetup=> {
                        const filter = rs => rs.user.id == message.member.id 
                        const collector = registersetup.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
                        collector.on('collect', async (rs) => {
                            var role = rs.values[0]
                            await guildRoleConfig.findOneAndUpdate({guildID: rs.guild.id}, {$set:{voiceMuteStaffRole:role}},{upsert:true})
                            rs.reply({content:`<@&${role}> Rolü **V-Mute Staff** olarak ayarlandı.`, ephemeral:true})
                            if(registersetup) registersetup.delete();
                        })
                    })
                }
                if(r.values[0] == "ban"){
                    let liste = [];
                    r.guild.roles.cache.sort((a,b)=> b.rawPosition - a.rawPosition).filter(x=> x.id != r.guild.id && !x.botRole && !x.name.includes("━")).forEach(x => {liste.push({roleName: x.name, roleId: x.id})});
                    let list = chunkify(liste,25);
                    let menu = []
                    for (let i = 0; i < list.length; i++) {
                        let e = list[i]
                        let menuliste = [];
                        e.forEach(x=> {menuliste.push({label:x.roleName, description:`${x.roleId}`, value: `${x.roleId}`}) })
                        menu.push( new SelectMenuBuilder().setMinValues(1).setMaxValues(4).setCustomId("menu"+i).setPlaceholder(`${i+1}. Rol Listesi`).addOptions(menuliste) )
                        menuliste = [];
                    }
                    let rows = [];
                    menu.forEach(x=> rows.push(new ActionRowBuilder().addComponents(x)))
                    r.reply({content:"Aşağıda gelen menü(ler)den İstediğiniz rolleri seçiniz.", ephemeral:true})
                    r.channel.send({components:rows,content:"Aşağıda bulunan menülerden ayarlamak istediğiniz rolleri seçiniz."}).then(async registersetup=> {
                        const filter = rs => rs.user.id == message.member.id 
                        const collector = registersetup.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
                        collector.on('collect', async (rs) => {
                            var role = rs.values[0]
                            await guildRoleConfig.findOneAndUpdate({guildID: rs.guild.id}, {$set:{banStaffRole:role}},{upsert:true})
                            rs.reply({content:`<@&${role}> Rolü **Ban Staff** olarak ayarlandı.`, ephemeral:true})
                            if(registersetup) registersetup.delete();
                        })
                    })
                }
                if(r.values[0] == "jail"){
                    let liste = [];
                    r.guild.roles.cache.sort((a,b)=> b.rawPosition - a.rawPosition).filter(x=> x.id != r.guild.id && !x.botRole && !x.name.includes("━")).forEach(x => {liste.push({roleName: x.name, roleId: x.id})});
                    let list = chunkify(liste,25);
                    let menu = []
                    for (let i = 0; i < list.length; i++) {
                        let e = list[i]
                        let menuliste = [];
                        e.forEach(x=> {menuliste.push({label:x.roleName, description:`${x.roleId}`, value: `${x.roleId}`}) })
                        menu.push( new SelectMenuBuilder().setMinValues(1).setMaxValues(4).setCustomId("menu"+i).setPlaceholder(`${i+1}. Rol Listesi`).addOptions(menuliste) )
                        menuliste = [];
                    }
                    let rows = [];
                    menu.forEach(x=> rows.push(new ActionRowBuilder().addComponents(x)))
                    r.reply({content:"Aşağıda gelen menü(ler)den İstediğiniz rolleri seçiniz.", ephemeral:true})
                    r.channel.send({components:rows,content:"Aşağıda bulunan menülerden ayarlamak istediğiniz rolleri seçiniz."}).then(async registersetup=> {
                        const filter = rs => rs.user.id == message.member.id 
                        const collector = registersetup.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
                        collector.on('collect', async (rs) => {
                            var role = rs.values[0]
                            await guildRoleConfig.findOneAndUpdate({guildID: rs.guild.id}, {$set:{jailedStaffRole:role}},{upsert:true})
                            rs.reply({content:`<@&${role}> Rolü **Jail Staff** olarak ayarlandı.`, ephemeral:true})
                            if(registersetup) registersetup.delete();
                        })
                    })
                }
                if(r.values[0] == "botcommand"){
                    let liste = [];
                    r.guild.roles.cache.sort((a,b)=> b.rawPosition - a.rawPosition).filter(x=> x.id != r.guild.id && !x.botRole && !x.name.includes("━")).forEach(x => {liste.push({roleName: x.name, roleId: x.id})});
                    let list = chunkify(liste,25);
                    let menu = []
                    for (let i = 0; i < list.length; i++) {
                        let e = list[i]
                        let menuliste = [];
                        e.forEach(x=> {menuliste.push({label:x.roleName, description:`${x.roleId}`, value: `${x.roleId}`}) })
                        menu.push( new SelectMenuBuilder().setMinValues(1).setMaxValues(4).setCustomId("menu"+i).setPlaceholder(`${i+1}. Rol Listesi`).addOptions(menuliste) )
                        menuliste = [];
                    }
                    let rows = [];
                    menu.forEach(x=> rows.push(new ActionRowBuilder().addComponents(x)))
                    r.reply({content:"Aşağıda gelen menü(ler)den İstediğiniz rolleri seçiniz.", ephemeral:true})
                    r.channel.send({components:rows,content:"Aşağıda bulunan menülerden ayarlamak istediğiniz rolleri seçiniz."}).then(async registersetup=> {
                        const filter = rs => rs.user.id == message.member.id 
                        const collector = registersetup.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
                        collector.on('collect', async (rs) => {
                            var role = rs.values[0]
                            await guildRoleConfig.findOneAndUpdate({guildID: rs.guild.id}, {$set:{botCommandsRole:role}},{upsert:true})
                            rs.reply({content:`<@&${role}> Rolü **Bot Command** olarak ayarlandı.`, ephemeral:true})
                            if(registersetup) registersetup.delete();
                        })
                    })
                }
                if(r.values[0] == "supheli"){
                    let liste = [];
                    r.guild.roles.cache.sort((a,b)=> b.rawPosition - a.rawPosition).filter(x=> x.id != r.guild.id && !x.botRole && !x.name.includes("━")).forEach(x => {liste.push({roleName: x.name, roleId: x.id})});
                    let list = chunkify(liste,25);
                    let menu = []
                    for (let i = 0; i < list.length; i++) {
                        let e = list[i]
                        let menuliste = [];
                        e.forEach(x=> {menuliste.push({label:x.roleName, description:`${x.roleId}`, value: `${x.roleId}`}) })
                        menu.push( new SelectMenuBuilder().setCustomId("menu"+i).setPlaceholder(`${i+1}. Rol Listesi`).addOptions(menuliste) )
                        menuliste = [];
                    }
                    let rows = [];
                    menu.forEach(x=> rows.push(new ActionRowBuilder().addComponents(x)))
                    r.reply({content:"Aşağıda gelen menü(ler)den İstediğiniz rolleri seçiniz.", ephemeral:true})
                    r.channel.send({components:rows,content:"Aşağıda bulunan menülerden ayarlamak istediğiniz rolleri seçiniz."}).then(async registersetup=> {
                        const filter = rs => rs.user.id == message.member.id 
                        const collector = registersetup.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
                        collector.on('collect', async (rs) => {
                            var role = rs.values[0]
                            await guildRoleConfig.findOneAndUpdate({guildID: rs.guild.id}, {$set:{suspectRole:role}},{upsert:true})
                            rs.reply({content:`<@&${role}> Rolü **Şüpheli** olarak ayarlandı.`, ephemeral:true})
                            if(registersetup) registersetup.delete();
                        })
                    })
                }
                if(r.values[0] == "cezali"){
                    let liste = [];
                    r.guild.roles.cache.sort((a,b)=> b.rawPosition - a.rawPosition).filter(x=> x.id != r.guild.id && !x.botRole && !x.name.includes("━")).forEach(x => {liste.push({roleName: x.name, roleId: x.id})});
                    let list = chunkify(liste,25);
                    let menu = []
                    for (let i = 0; i < list.length; i++) {
                        let e = list[i]
                        let menuliste = [];
                        e.forEach(x=> {menuliste.push({label:x.roleName, description:`${x.roleId}`, value: `${x.roleId}`}) })
                        menu.push( new SelectMenuBuilder().setCustomId("menu"+i).setPlaceholder(`${i+1}. Rol Listesi`).addOptions(menuliste) )
                        menuliste = [];
                    }
                    let rows = [];
                    menu.forEach(x=> rows.push(new ActionRowBuilder().addComponents(x)))
                    r.reply({content:"Aşağıda gelen menü(ler)den İstediğiniz rolleri seçiniz.", ephemeral:true})
                    r.channel.send({components:rows,content:"Aşağıda bulunan menülerden ayarlamak istediğiniz rolleri seçiniz."}).then(async registersetup=> {
                        const filter = rs => rs.user.id == message.member.id 
                        const collector = registersetup.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
                        collector.on('collect', async (rs) => {
                            var role = rs.values[0]
                            await guildRoleConfig.findOneAndUpdate({guildID: rs.guild.id}, {$set:{jailedRole:role}},{upsert:true})
                            rs.reply({content:`<@&${role}> Rolü **Cezalı** olarak ayarlandı.`, ephemeral:true})
                            if(registersetup) registersetup.delete();
                        })
                    })
                }
                if(r.values[0] == "yasaktag"){
                    let liste = [];
                    r.guild.roles.cache.sort((a,b)=> b.rawPosition - a.rawPosition).filter(x=> x.id != r.guild.id && !x.botRole && !x.name.includes("━")).forEach(x => {liste.push({roleName: x.name, roleId: x.id})});
                    let list = chunkify(liste,25);
                    let menu = []
                    for (let i = 0; i < list.length; i++) {
                        let e = list[i]
                        let menuliste = [];
                        e.forEach(x=> {menuliste.push({label:x.roleName, description:`${x.roleId}`, value: `${x.roleId}`}) })
                        menu.push( new SelectMenuBuilder().setMinValues(1).setMaxValues(4).setCustomId("menu"+i).setPlaceholder(`${i+1}. Rol Listesi`).addOptions(menuliste) )
                        menuliste = [];
                    }
                    let rows = [];
                    menu.forEach(x=> rows.push(new ActionRowBuilder().addComponents(x)))
                    r.reply({content:"Aşağıda gelen menü(ler)den İstediğiniz rolleri seçiniz.", ephemeral:true})
                    r.channel.send({components:rows,content:"Aşağıda bulunan menülerden ayarlamak istediğiniz rolleri seçiniz."}).then(async registersetup=> {
                        const filter = rs => rs.user.id == message.member.id 
                        const collector = registersetup.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
                        collector.on('collect', async (rs) => {
                            var role = rs.values[0]
                            await guildRoleConfig.findOneAndUpdate({guildID: rs.guild.id}, {$set:{bannedTagRole:role}},{upsert:true})
                            rs.reply({content:`<@&${role}> Rolü **Yasaklı Tag** olarak ayarlandı.`, ephemeral:true})
                            if(registersetup) registersetup.delete();
                        })
                    })
                }
                if(r.values[0] == "botrol"){
                    let liste = [];
                    r.guild.roles.cache.sort((a,b)=> b.rawPosition - a.rawPosition).filter(x=> x.id != r.guild.id && !x.botRole && !x.name.includes("━")).forEach(x => {liste.push({roleName: x.name, roleId: x.id})});
                    let list = chunkify(liste,25);
                    let menu = []
                    for (let i = 0; i < list.length; i++) {
                        let e = list[i]
                        let menuliste = [];
                        e.forEach(x=> {menuliste.push({label:x.roleName, description:`${x.roleId}`, value: `${x.roleId}`}) })
                        menu.push( new SelectMenuBuilder().setMinValues(1).setMaxValues(4).setCustomId("menu"+i).setPlaceholder(`${i+1}. Rol Listesi`).addOptions(menuliste) )
                        menuliste = [];
                    }
                    let rows = [];
                    menu.forEach(x=> rows.push(new ActionRowBuilder().addComponents(x)))
                    r.reply({content:"Aşağıda gelen menü(ler)den İstediğiniz rolleri seçiniz.", ephemeral:true})
                    r.channel.send({components:rows,content:"Aşağıda bulunan menülerden ayarlamak istediğiniz rolleri seçiniz."}).then(async registersetup=> {
                        const filter = rs => rs.user.id == message.member.id 
                        const collector = registersetup.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
                        collector.on('collect', async (rs) => {
                            var role = rs.values[0]
                            await guildRoleConfig.findOneAndUpdate({guildID: rs.guild.id}, {$set:{botRole:role}},{upsert:true})
                            rs.reply({content:`<@&${role}> Rolü **Bot** olarak ayarlandı.`, ephemeral:true})
                            if(registersetup) registersetup.delete();
                        })
                    })
                }
                if(r.values[0] == "cmuted"){
                    let liste = [];
                    r.guild.roles.cache.sort((a,b)=> b.rawPosition - a.rawPosition).filter(x=> x.id != r.guild.id && !x.botRole && !x.name.includes("━")).forEach(x => {liste.push({roleName: x.name, roleId: x.id})});
                    let list = chunkify(liste,25);
                    let menu = []
                    for (let i = 0; i < list.length; i++) {
                        let e = list[i]
                        let menuliste = [];
                        e.forEach(x=> {menuliste.push({label:x.roleName, description:`${x.roleId}`, value: `${x.roleId}`}) })
                        menu.push( new SelectMenuBuilder().setMinValues(1).setMaxValues(4).setCustomId("menu"+i).setPlaceholder(`${i+1}. Rol Listesi`).addOptions(menuliste) )
                        menuliste = [];
                    }
                    let rows = [];
                    menu.forEach(x=> rows.push(new ActionRowBuilder().addComponents(x)))
                    r.reply({content:"Aşağıda gelen menü(ler)den İstediğiniz rolleri seçiniz.", ephemeral:true})
                    r.channel.send({components:rows,content:"Aşağıda bulunan menülerden ayarlamak istediğiniz rolleri seçiniz."}).then(async registersetup=> {
                        const filter = rs => rs.user.id == message.member.id 
                        const collector = registersetup.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
                        collector.on('collect', async (rs) => {
                            var role = rs.values[0]
                            await guildRoleConfig.findOneAndUpdate({guildID: rs.guild.id}, {$set:{chatMutedRole:role}},{upsert:true})
                            rs.reply({content:`<@&${role}> Rolü **C-Muted** olarak ayarlandı.`, ephemeral:true})
                            if(registersetup) registersetup.delete();
                        })
                    })
                }
                if(r.values[0] == "vmuted"){
                    let liste = [];
                    r.guild.roles.cache.sort((a,b)=> b.rawPosition - a.rawPosition).filter(x=> x.id != r.guild.id && !x.botRole && !x.name.includes("━")).forEach(x => {liste.push({roleName: x.name, roleId: x.id})});
                    let list = chunkify(liste,25);
                    let menu = []
                    for (let i = 0; i < list.length; i++) {
                        let e = list[i]
                        let menuliste = [];
                        e.forEach(x=> {menuliste.push({label:x.roleName, description:`${x.roleId}`, value: `${x.roleId}`}) })
                        menu.push( new SelectMenuBuilder().setMinValues(1).setMaxValues(4).setCustomId("menu"+i).setPlaceholder(`${i+1}. Rol Listesi`).addOptions(menuliste) )
                        menuliste = [];
                    }
                    let rows = [];
                    menu.forEach(x=> rows.push(new ActionRowBuilder().addComponents(x)))
                    r.reply({content:"Aşağıda gelen menü(ler)den İstediğiniz rolleri seçiniz.", ephemeral:true})
                    r.channel.send({components:rows,content:"Aşağıda bulunan menülerden ayarlamak istediğiniz rolleri seçiniz."}).then(async registersetup=> {
                        const filter = rs => rs.user.id == message.member.id 
                        const collector = registersetup.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
                        collector.on('collect', async (rs) => {
                            var role = rs.values[0]
                            await guildRoleConfig.findOneAndUpdate({guildID: rs.guild.id}, {$set:{voiceMutedRole:role}},{upsert:true})
                            rs.reply({content:`<@&${role}> Rolü **V-Muted** olarak ayarlandı.`, ephemeral:true})
                            if(registersetup) registersetup.delete();
                        })
                    })
                }
                if(r.values[0] == "kurucurolleri"){
                    let liste = [];
                    r.guild.roles.cache.sort((a,b)=> b.rawPosition - a.rawPosition).filter(x=> x.id != r.guild.id && !x.botRole && !x.name.includes("━")).forEach(x => {liste.push({roleName: x.name, roleId: x.id})});
                    let list = chunkify(liste,25);
                    let menu = []
                    for (let i = 0; i < list.length; i++) {
                        let e = list[i]
                        let menuliste = [];
                        e.forEach(x=> {menuliste.push({label:x.roleName, description:`${x.roleId}`, value: `${x.roleId}`}) })
                        menu.push( new SelectMenuBuilder().setMinValues(1).setMaxValues(5).setCustomId("menu"+i).setPlaceholder(`${i+1}. Rol Listesi`).addOptions(menuliste) )
                        menuliste = [];
                    }
                    let rows = [];
                    menu.forEach(x=> rows.push(new ActionRowBuilder().addComponents(x)))
                    r.reply({content:"Aşağıda gelen menü(ler)den İstediğiniz rolleri seçiniz.", ephemeral:true})
                    r.channel.send({components:rows,content:"Aşağıda bulunan menülerden ayarlamak istediğiniz rolleri seçiniz."}).then(async registersetup=> {
                        const filter = rs => rs.user.id == message.member.id 
                        const collector = registersetup.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
                        collector.on('collect', async (rs) => {
                            var role = []
                            for (let index = 0; index < rs.values.length; index++) {
                              let ids = rs.values[index]
                              role.push(ids)
                            }
                            await guildRoleConfig.findOneAndUpdate({guildID: rs.guild.id}, {$set:{kurucuPerms:role}},{upsert:true})
                            rs.reply({content:`${role.map(x=> `<@&${x}>`).join(", ")} Rol(leri/ü) **Kurucu** olarak ayarlandı.`, ephemeral:true})
                            if(registersetup) registersetup.delete();
                        })
                    })
                }
                if(r.values[0] == "ustyonetim"){
                    let liste = [];
                    r.guild.roles.cache.sort((a,b)=> b.rawPosition - a.rawPosition).filter(x=> x.id != r.guild.id && !x.botRole && !x.name.includes("━")).forEach(x => {liste.push({roleName: x.name, roleId: x.id})});
                    let list = chunkify(liste,25);
                    let menu = []
                    for (let i = 0; i < list.length; i++) {
                        let e = list[i]
                        let menuliste = [];
                        e.forEach(x=> {menuliste.push({label:x.roleName, description:`${x.roleId}`, value: `${x.roleId}`}) })
                        menu.push( new SelectMenuBuilder().setMinValues(1).setMaxValues(5).setCustomId("menu"+i).setPlaceholder(`${i+1}. Rol Listesi`).addOptions(menuliste) )
                        menuliste = [];
                    }
                    let rows = [];
                    menu.forEach(x=> rows.push(new ActionRowBuilder().addComponents(x)))
                    r.reply({content:"Aşağıda gelen menü(ler)den İstediğiniz rolleri seçiniz.", ephemeral:true})
                    r.channel.send({components:rows,content:"Aşağıda bulunan menülerden ayarlamak istediğiniz rolleri seçiniz."}).then(async registersetup=> {
                        const filter = rs => rs.user.id == message.member.id 
                        const collector = registersetup.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
                        collector.on('collect', async (rs) => {
                            var role = []
                            for (let index = 0; index < rs.values.length; index++) {
                              let ids = rs.values[index]
                              role.push(ids)
                            }
                            await guildRoleConfig.findOneAndUpdate({guildID: rs.guild.id}, {$set:{üstYönetimPerms:role}},{upsert:true})
                            rs.reply({content:`${role.map(x=> `<@&${x}>`).join(", ")} Rol(leri/ü) **ÜSt Yönetim** olarak ayarlandı.`, ephemeral:true})
                            if(registersetup) registersetup.delete();
                        })
                    })
                
                }
                if(r.values[0] == "ortayonetim"){
                    let liste = [];
                    r.guild.roles.cache.sort((a,b)=> b.rawPosition - a.rawPosition).filter(x=> x.id != r.guild.id && !x.botRole && !x.name.includes("━")).forEach(x => {liste.push({roleName: x.name, roleId: x.id})});
                    let list = chunkify(liste,25);
                    let menu = []
                    for (let i = 0; i < list.length; i++) {
                        let e = list[i]
                        let menuliste = [];
                        e.forEach(x=> {menuliste.push({label:x.roleName, description:`${x.roleId}`, value: `${x.roleId}`}) })
                        menu.push( new SelectMenuBuilder().setMinValues(1).setMaxValues(5).setCustomId("menu"+i).setPlaceholder(`${i+1}. Rol Listesi`).addOptions(menuliste) )
                        menuliste = [];
                    }
                    let rows = [];
                    menu.forEach(x=> rows.push(new ActionRowBuilder().addComponents(x)))
                    r.reply({content:"Aşağıda gelen menü(ler)den İstediğiniz rolleri seçiniz.", ephemeral:true})
                    r.channel.send({components:rows,content:"Aşağıda bulunan menülerden ayarlamak istediğiniz rolleri seçiniz."}).then(async registersetup=> {
                        const filter = rs => rs.user.id == message.member.id 
                        const collector = registersetup.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
                        collector.on('collect', async (rs) => {
                            var role = []
                            for (let index = 0; index < rs.values.length; index++) {
                              let ids = rs.values[index]
                              role.push(ids)
                            }
                            await guildRoleConfig.findOneAndUpdate({guildID: rs.guild.id}, {$set:{ortaYönetimPerms:role}},{upsert:true})
                            rs.reply({content:`${role.map(x=> `<@&${x}>`).join(", ")} Rol(leri/ü) **Orta Yönetim** olarak ayarlandı.`, ephemeral:true})
                            if(registersetup) registersetup.delete();
                        })
                    })
                }
                if(r.values[0] == "altyonetim"){
                    let liste = [];
                    r.guild.roles.cache.sort((a,b)=> b.rawPosition - a.rawPosition).filter(x=> x.id != r.guild.id && !x.botRole && !x.name.includes("━")).forEach(x => {liste.push({roleName: x.name, roleId: x.id})});
                    let list = chunkify(liste,25);
                    let menu = []
                    for (let i = 0; i < list.length; i++) {
                        let e = list[i]
                        let menuliste = [];
                        e.forEach(x=> {menuliste.push({label:x.roleName, description:`${x.roleId}`, value: `${x.roleId}`}) })
                        menu.push( new SelectMenuBuilder().setMinValues(1).setMaxValues(5).setCustomId("menu"+i).setPlaceholder(`${i+1}. Rol Listesi`).addOptions(menuliste) )
                        menuliste = [];
                    }
                    let rows = [];
                    menu.forEach(x=> rows.push(new ActionRowBuilder().addComponents(x)))
                    r.reply({content:"Aşağıda gelen menü(ler)den İstediğiniz rolleri seçiniz.", ephemeral:true})
                    r.channel.send({components:rows,content:"Aşağıda bulunan menülerden ayarlamak istediğiniz rolleri seçiniz."}).then(async registersetup=> {
                        const filter = rs => rs.user.id == message.member.id 
                        const collector = registersetup.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
                        collector.on('collect', async (rs) => {
                            var role = []
                            for (let index = 0; index < rs.values.length; index++) {
                              let ids = rs.values[index]
                              role.push(ids)
                            }
                            await guildRoleConfig.findOneAndUpdate({guildID: rs.guild.id}, {$set:{altYönetimPerms:role}},{upsert:true})
                            rs.reply({content:`${role.map(x=> `<@&${x}>`).join(", ")} Rol(leri/ü) **Alt Yönetim** olarak ayarlandı.`, ephemeral:true})
                            if(registersetup) registersetup.delete();
                        })
                    })
                }
            })
         })

        }
        if(i.values[0] == "kanal"){
            i.reply({content:"Kanal ayarlamalarını aşağıda gösterildiği gibi yapabilirsin.",ephemeral:true});
            const menu = new ActionRowBuilder()
            .addComponents(
               new SelectMenuBuilder()
               .setCustomId("roleconfig")
               .setPlaceholder("Ayarlamak istediğiniz rolü menüden seçin")
               .setOptions([
                {value:"welcome", label:"Hoşgeldin kanalı", description:"Kişi sunucuya katılınıca onu havalı bir mesaj ile karşılıyıcak."},
                {value:"suspect", label:"Şüpheli hesap log", description:"Şüpheli hesapları bildiriceği kanal"},
                {value:"chat", label:"Chat (Sohbet)", description:"Genel Sohbet Kanalına kayıt işleminden sonra karşılama mesajı atıcak"},
                {value:"jailedlog", label:"Jail (Cezalı) Log",description:"Cezalı log"},
                {value:"banlog",label:"Ban Log",description:"Ban Log"},
                {value:"cmuted",label:"C-Muted Log",description:"Chat Mute Log"},
                {value:"vmuted",label:"V-Muted Log",description:"Voice Mute Log"},
                {value:"invitelog",label:"İnvite Log",description:"Davet (Invite) Log"},
                {value:"cezapuanlog",label:"Ceza Puan Log",description:"Ceza Puan Log"},
               ]))
               await message.channel.send({embeds:[new EmbedBuilder().setDescription("Ayarlamak istediğiniz kanal logunu menüden seçiniz")], components:[menu]}).then(async kanallogsetupmsg => {
                const filter = c => c.user.id == message.member.id 
                const collector = kanallogsetupmsg.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
                collector.on('collect', async (k) => {
                    if(k.values[0] == "welcome") {
                        let liste = [];
                        k.guild.channels.cache.sort((a,b)=> a.rawPosition - b.rawPosition).filter(x=> x.type == 0).forEach(x => {liste.push({roleName: x.name, roleId: x.id})});
                        let list = chunkify(liste,25);
                        let menu = []
                        for (let i = 0; i < list.length; i++) {
                            let e = list[i]
                            let menuliste = [];
                            e.forEach(x=> {menuliste.push({label:x.roleName, description:`${x.roleId}`, value: `${x.roleId}`}) })
                            menu.push( new SelectMenuBuilder().setCustomId("menu"+i).setPlaceholder(`${i+1}. Kanal Listesi`).addOptions(menuliste) )
                            menuliste = [];
                        }
                        let rows = [];
                        menu.forEach(x=> rows.push(new ActionRowBuilder().addComponents(x)))
                        k.reply({content:"Aşağıda gelen menü(ler)den İstediğiniz Kanalları seçiniz.", ephemeral:true})
                        k.channel.send({components:rows,content:"Aşağıda bulunan menülerden ayarlamak istediğiniz Kanalları seçiniz."}).then(async registersetup=> {
                            const filter = rs => rs.user.id == message.member.id 
                            const collector = registersetup.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
                            collector.on('collect', async (rs) => {
                                var role = rs.values[0]
                                await guildChannelConfig.findOneAndUpdate({guildID: rs.guild.id}, {$set:{welcomeChannel:role}},{upsert:true})
                                rs.reply({content:`<#${role}> Kanalı **Welcome Channel** olarak ayarlandı.`, ephemeral:true})
                                if(registersetup) registersetup.delete();
                            })
                        })
                    }
                    if(k.values[0] == "suspect") {
                        let liste = [];
                        k.guild.channels.cache.sort((a,b)=> a.rawPosition - b.rawPosition).filter(x=> x.type == 0).forEach(x => {liste.push({roleName: x.name, roleId: x.id})});
                        let list = chunkify(liste,25);
                        let menu = []
                        for (let i = 0; i < list.length; i++) {
                            let e = list[i]
                            let menuliste = [];
                            e.forEach(x=> {menuliste.push({label:x.roleName, description:`${x.roleId}`, value: `${x.roleId}`}) })
                            menu.push( new SelectMenuBuilder().setCustomId("menu"+i).setPlaceholder(`${i+1}. Kanal Listesi`).addOptions(menuliste) )
                            menuliste = [];
                        }
                        let rows = [];
                        menu.forEach(x=> rows.push(new ActionRowBuilder().addComponents(x)))
                        k.reply({content:"Aşağıda gelen menü(ler)den İstediğiniz Kanalları seçiniz.", ephemeral:true})
                        k.channel.send({components:rows,content:"Aşağıda bulunan menülerden ayarlamak istediğiniz Kanalları seçiniz."}).then(async registersetup=> {
                            const filter = rs => rs.user.id == message.member.id 
                            const collector = registersetup.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
                            collector.on('collect', async (rs) => {
                                var role = rs.values[0]
                                await guildChannelConfig.findOneAndUpdate({guildID: rs.guild.id}, {$set:{suspectLog:role}},{upsert:true})
                                rs.reply({content:`<#${role}> Kanalı **Şüpheli hesap Log** olarak ayarlandı.`, ephemeral:true})
                                if(registersetup) registersetup.delete();
                            })
                        })
                    }
                    if(k.values[0] == "chat") {
                        let liste = [];
                        k.guild.channels.cache.sort((a,b)=> a.rawPosition - b.rawPosition).filter(x=> x.type == 0).forEach(x => {liste.push({roleName: x.name, roleId: x.id})});
                        let list = chunkify(liste,25);
                        let menu = []
                        for (let i = 0; i < list.length; i++) {
                            let e = list[i]
                            let menuliste = [];
                            e.forEach(x=> {menuliste.push({label:x.roleName, description:`${x.roleId}`, value: `${x.roleId}`}) })
                            menu.push( new SelectMenuBuilder().setCustomId("menu"+i).setPlaceholder(`${i+1}. Kanal Listesi`).addOptions(menuliste) )
                            menuliste = [];
                        }
                        let rows = [];
                        menu.forEach(x=> rows.push(new ActionRowBuilder().addComponents(x)))
                        k.reply({content:"Aşağıda gelen menü(ler)den İstediğiniz Kanalları seçiniz.", ephemeral:true})
                        k.channel.send({components:rows,content:"Aşağıda bulunan menülerden ayarlamak istediğiniz Kanalları seçiniz."}).then(async registersetup=> {
                            const filter = rs => rs.user.id == message.member.id 
                            const collector = registersetup.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
                            collector.on('collect', async (rs) => {
                                var role = rs.values[0]
                                await guildChannelConfig.findOneAndUpdate({guildID: rs.guild.id}, {$set:{chatChannel:role}},{upsert:true})
                                rs.reply({content:`<#${role}> Kanalı **Chat (Genel Sohbet)** olarak ayarlandı.`, ephemeral:true})
                                if(registersetup) registersetup.delete();
                            })
                        })
                    }
                    if(k.values[0] == "jailedlog") {
                        let liste = [];
                        k.guild.channels.cache.sort((a,b)=> a.rawPosition - b.rawPosition).filter(x=> x.type == 0).forEach(x => {liste.push({roleName: x.name, roleId: x.id})});
                        let list = chunkify(liste,25);
                        let menu = []
                        for (let i = 0; i < list.length; i++) {
                            let e = list[i]
                            let menuliste = [];
                            e.forEach(x=> {menuliste.push({label:x.roleName, description:`${x.roleId}`, value: `${x.roleId}`}) })
                            menu.push( new SelectMenuBuilder().setCustomId("menu"+i).setPlaceholder(`${i+1}. Kanal Listesi`).addOptions(menuliste) )
                            menuliste = [];
                        }
                        let rows = [];
                        menu.forEach(x=> rows.push(new ActionRowBuilder().addComponents(x)))
                        k.reply({content:"Aşağıda gelen menü(ler)den İstediğiniz Kanalları seçiniz.", ephemeral:true})
                        k.channel.send({components:rows,content:"Aşağıda bulunan menülerden ayarlamak istediğiniz Kanalları seçiniz."}).then(async registersetup=> {
                            const filter = rs => rs.user.id == message.member.id 
                            const collector = registersetup.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
                            collector.on('collect', async (rs) => {
                                var role = rs.values[0]
                                await guildChannelConfig.findOneAndUpdate({guildID: rs.guild.id}, {$set:{jailedLog:role}},{upsert:true})
                                rs.reply({content:`<#${role}> Kanalı **Jailed Log** olarak ayarlandı.`, ephemeral:true})
                                if(registersetup) registersetup.delete();
                            })
                        })
                    }
                    if(k.values[0] == "banlog") {
                        let liste = [];
                        k.guild.channels.cache.sort((a,b)=> a.rawPosition - b.rawPosition).filter(x=> x.type == 0).forEach(x => {liste.push({roleName: x.name, roleId: x.id})});
                        let list = chunkify(liste,25);
                        let menu = []
                        for (let i = 0; i < list.length; i++) {
                            let e = list[i]
                            let menuliste = [];
                            e.forEach(x=> {menuliste.push({label:x.roleName, description:`${x.roleId}`, value: `${x.roleId}`}) })
                            menu.push( new SelectMenuBuilder().setCustomId("menu"+i).setPlaceholder(`${i+1}. Kanal Listesi`).addOptions(menuliste) )
                            menuliste = [];
                        }
                        let rows = [];
                        menu.forEach(x=> rows.push(new ActionRowBuilder().addComponents(x)))
                        k.reply({content:"Aşağıda gelen menü(ler)den İstediğiniz Kanalları seçiniz.", ephemeral:true})
                        k.channel.send({components:rows,content:"Aşağıda bulunan menülerden ayarlamak istediğiniz Kanalları seçiniz."}).then(async registersetup=> {
                            const filter = rs => rs.user.id == message.member.id 
                            const collector = registersetup.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
                            collector.on('collect', async (rs) => {
                                var role = rs.values[0]
                                await guildChannelConfig.findOneAndUpdate({guildID: rs.guild.id}, {$set:{bannedLog:role}},{upsert:true})
                                rs.reply({content:`<#${role}> Kanalı **Ban Log** olarak ayarlandı.`, ephemeral:true})
                                if(registersetup) registersetup.delete();
                            })
                        })
                    }
                    if(k.values[0] == "cmuted") {
                        let liste = [];
                        k.guild.channels.cache.sort((a,b)=> a.rawPosition - b.rawPosition).filter(x=> x.type == 0).forEach(x => {liste.push({roleName: x.name, roleId: x.id})});
                        let list = chunkify(liste,25);
                        let menu = []
                        for (let i = 0; i < list.length; i++) {
                            let e = list[i]
                            let menuliste = [];
                            e.forEach(x=> {menuliste.push({label:x.roleName, description:`${x.roleId}`, value: `${x.roleId}`}) })
                            menu.push( new SelectMenuBuilder().setCustomId("menu"+i).setPlaceholder(`${i+1}. Kanal Listesi`).addOptions(menuliste) )
                            menuliste = [];
                        }
                        let rows = [];
                        menu.forEach(x=> rows.push(new ActionRowBuilder().addComponents(x)))
                        k.reply({content:"Aşağıda gelen menü(ler)den İstediğiniz Kanalları seçiniz.", ephemeral:true})
                        k.channel.send({components:rows,content:"Aşağıda bulunan menülerden ayarlamak istediğiniz Kanalları seçiniz."}).then(async registersetup=> {
                            const filter = rs => rs.user.id == message.member.id 
                            const collector = registersetup.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
                            collector.on('collect', async (rs) => {
                                var role = rs.values[0]
                                await guildChannelConfig.findOneAndUpdate({guildID: rs.guild.id}, {$set:{cMutedLog:role}},{upsert:true})
                                rs.reply({content:`<#${role}> Kanalı **C-Muted Log** olarak ayarlandı.`, ephemeral:true})
                                if(registersetup) registersetup.delete();
                            })
                        })
                    }
                    if(k.values[0] == "vmuted") {
                        let liste = [];
                        k.guild.channels.cache.sort((a,b)=> a.rawPosition - b.rawPosition).filter(x=> x.type == 0).forEach(x => {liste.push({roleName: x.name, roleId: x.id})});
                        let list = chunkify(liste,25);
                        let menu = []
                        for (let i = 0; i < list.length; i++) {
                            let e = list[i]
                            let menuliste = [];
                            e.forEach(x=> {menuliste.push({label:x.roleName, description:`${x.roleId}`, value: `${x.roleId}`}) })
                            menu.push( new SelectMenuBuilder().setCustomId("menu"+i).setPlaceholder(`${i+1}. Kanal Listesi`).addOptions(menuliste) )
                            menuliste = [];
                        }
                        let rows = [];
                        menu.forEach(x=> rows.push(new ActionRowBuilder().addComponents(x)))
                        k.reply({content:"Aşağıda gelen menü(ler)den İstediğiniz Kanalları seçiniz.", ephemeral:true})
                        k.channel.send({components:rows,content:"Aşağıda bulunan menülerden ayarlamak istediğiniz Kanalları seçiniz."}).then(async registersetup=> {
                            const filter = rs => rs.user.id == message.member.id 
                            const collector = registersetup.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
                            collector.on('collect', async (rs) => {
                                var role = rs.values[0]
                                await guildChannelConfig.findOneAndUpdate({guildID: rs.guild.id}, {$set:{vMutedLog:role}},{upsert:true})
                                rs.reply({content:`<#${role}> Kanalı **V-Muted Log** olarak ayarlandı.`, ephemeral:true})
                                if(registersetup) registersetup.delete();
                            })
                        })
                    }
                    if(k.values[0] == "invitelog") {
                        let liste = [];
                        k.guild.channels.cache.sort((a,b)=> a.rawPosition - b.rawPosition).filter(x=> x.type == 0).forEach(x => {liste.push({roleName: x.name, roleId: x.id})});
                        let list = chunkify(liste,25);
                        let menu = []
                        for (let i = 0; i < list.length; i++) {
                            let e = list[i]
                            let menuliste = [];
                            e.forEach(x=> {menuliste.push({label:x.roleName, description:`${x.roleId}`, value: `${x.roleId}`}) })
                            menu.push( new SelectMenuBuilder().setCustomId("menu"+i).setPlaceholder(`${i+1}. Kanal Listesi`).addOptions(menuliste) )
                            menuliste = [];
                        }
                        let rows = [];
                        menu.forEach(x=> rows.push(new ActionRowBuilder().addComponents(x)))
                        k.reply({content:"Aşağıda gelen menü(ler)den İstediğiniz Kanalları seçiniz.", ephemeral:true})
                        k.channel.send({components:rows,content:"Aşağıda bulunan menülerden ayarlamak istediğiniz Kanalları seçiniz."}).then(async registersetup=> {
                            const filter = rs => rs.user.id == message.member.id 
                            const collector = registersetup.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
                            collector.on('collect', async (rs) => {
                                var role = rs.values[0]
                                await guildChannelConfig.findOneAndUpdate({guildID: rs.guild.id}, {$set:{inviteLog:role}},{upsert:true})
                                rs.reply({content:`<#${role}> Kanalı **Davet (Invite) Log** olarak ayarlandı.`, ephemeral:true})
                                if(registersetup) registersetup.delete();
                            })
                        })
                    }
                    if(k.values[0] == "cezapuanlog") {
                        let liste = [];
                        k.guild.channels.cache.sort((a,b)=> a.rawPosition - b.rawPosition).filter(x=> x.type == 0).forEach(x => {liste.push({roleName: x.name, roleId: x.id})});
                        let list = chunkify(liste,25);
                        let menu = []
                        for (let i = 0; i < list.length; i++) {
                            let e = list[i]
                            let menuliste = [];
                            e.forEach(x=> {menuliste.push({label:x.roleName, description:`${x.roleId}`, value: `${x.roleId}`}) })
                            menu.push( new SelectMenuBuilder().setCustomId("menu"+i).setPlaceholder(`${i+1}. Kanal Listesi`).addOptions(menuliste) )
                            menuliste = [];
                        }
                        let rows = [];
                        menu.forEach(x=> rows.push(new ActionRowBuilder().addComponents(x)))
                        k.reply({content:"Aşağıda gelen menü(ler)den İstediğiniz Kanalları seçiniz.", ephemeral:true})
                        k.channel.send({components:rows,content:"Aşağıda bulunan menülerden ayarlamak istediğiniz Kanalları seçiniz."}).then(async registersetup=> {
                            const filter = rs => rs.user.id == message.member.id 
                            const collector = registersetup.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 30000*10 })
                            collector.on('collect', async (rs) => {
                                var role = rs.values[0]
                                await guildChannelConfig.findOneAndUpdate({guildID: rs.guild.id}, {$set:{penaltyPointsLog:role}},{upsert:true})
                                rs.reply({content:`<#${role}> Kanalı **Ceza Puan log** olarak ayarlandı.`, ephemeral:true})
                                if(registersetup) registersetup.delete();
                            })
                        })
                    }
                })
               })
        }
        if(i.values[0] == "bot"){
            let OWNBOTS = []
            BOTS.forEach(bot => {
                OWNBOTS.push({
                    value: bot.user.id,
                    emoji: { id: "925127916621291541" },
                    label: `${bot.user.username}`,
                    description: `${bot.user.id}`
                })
            })
            let Row = new ActionRowBuilder().addComponents(
                new SelectMenuBuilder()
                .setCustomId("selectBot")
                .setPlaceholder("Güncellenmesini istediğiniz botu seçin.")
                .setOptions(
                    OWNBOTS
                )
            )
        
            let msg = await i.channel.send({embeds: [embed.setDescription(`Aşağıda sıralanmakta olan botların ismini, profil fotoğrafını, durumunu ve hakkındasını değişmesini istediğiniz bir botu seçiniz.`)],components: [Row]})
            const filter = i => i.user.id == message.member.id
            const collector = msg.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 35000 })
        
            collector.on('collect', async (botSetupint) => {
                if(botSetupint.customId == "selectBot") {
                    let type = botSetupint.values
                    if(!type) return await botSetupint.reply({content: "Bir bot veya işlem bulunamadı!", ephemeral: true})
        
                        let botId = botSetupint.values
                        let botClient = BOTS.find(bot => bot.user.id == type)
                        if(!botClient) return await botSetupint.reply({content: "Bir bot veya işlem bulunamadı!", ephemeral: true})
                        let updateRow = new ActionRowBuilder().addComponents(
                            new ButtonBuilder()
                            .setCustomId("selectAvatar")
                            .setEmoji("943286130357444608")
                            .setLabel("Profil Fotoğrafı Değişikliliği")
                            .setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder()
                            .setCustomId("selectName")
                            .setEmoji("943290426562076762")
                            .setLabel("İsim Değişikliliği")
                            .setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder()
                            .setCustomId("selectAbout")
                            .setEmoji("943290446329835570")
                            .setLabel("Hakkında Değişikliliği")
                            .setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder()
                            .setCustomId("selectState")
                            .setEmoji("951514358377234432")
                            .setLabel("Durum Değişikliliği")
                            .setStyle(ButtonStyle.Secondary),
                        )
                        msg.delete().catch(err => {})
                        await message.channel.send({embeds: [embed.setDescription(`${botClient.user} (**${botClient.user.tag}**) isimli bot üzerinde yapmak istediğiniz değişikliliği seçiniz?`)], components: [
                            updateRow
                        ]}).then(msg => {
                            const filter = i => i.user.id == message.member.id 
                            const collector = msg.createMessageComponentCollector({ filter: filter,  errors: ["time"], time: 35000 })
                            collector.on("collect", async (i) => {
                                let botClient = BOTS.find(bot => bot.user.id == botId)
                                if(!botClient) return await botSetupint.reply({content: "Bir bot veya işlem bulunamadı!", ephemeral: true})
                                if(botSetupint.customId == "selectAbout" || botSetupint.customId == "selectState") {
                                    await botSetupint.reply({content:`Şuan yapım aşamasında.`, ephemeral: true})
                                }
                                if(botSetupint.customId == "selectAvatar") {
                                     msg.edit({embeds: [embed.setDescription(` ${botClient.user} isimli botun yeni profil resmini yükleyin veya bağlantısını girin. İşlemi iptal etmek için (**iptal**) yazabilirsiniz. (**Süre**: \`60 Saniye\`)`)],components: []})
                                    var isimfilter = m => m.author.id == message.member.id
                                    let col = msg.channel.createMessageCollector({filter: isimfilter, time: 60000, max: 1, errors: ["time"]})
        
                                    col.on('collect', async (m) => {
                                        if (m.content == ("iptal" || "i")) {
                                            msg.delete().catch(err => {});
                                            message.react(await emojiBul("appEmoji_carpi")).catch(err => {})
                                            await botSetupint.reply({content: ` Profil resmi değiştirme işlemi iptal edildi.`, ephemeral: true})
                                            return;
                                          };
                                          let eskinick = botClient.user.avatarURL({dynamic: true})
                                          let bekle = await message.reply(`Bu işlem biraz uzun sürebilir, Lütfen bekleyin...`)
                                           let isim = m.content || m.attachments.first().url
                                            if(!isim) {
                                                message.react(await emojiBul("appEmoji_carpi")).catch(err => {})
                                                msg.delete().catch(err => {});
                                                await botSetupint.reply({content: ` Profil resmi belirtilmediği için işlem iptal edildi.`, ephemeral: true})
                                                return;
                                            }
                                          botClient.user.setAvatar(isim).then(x => {
                                              bekle.delete().catch(err => {})
                                              msg.delete().catch(err => {})
                                              let logChannel = message.guild.kanalBul("guild-log")
                                              if(logChannel) logChannel.send({embeds: [embed.setFooter(`${tarihsel(Date.now())} tarihinde işleme koyuldu.`).setDescription(`${message.member} tarafından ${botClient.user} isimli botun profil resmi değiştirildi.`).setThumbnail(botClient.user.avatarURL())]})
                                              message.channel.send({embeds: [embed.setDescription(` Başarıyla! ${botClient.user} isimli botun profil resmi güncellendi!`).setThumbnail(botClient.user.avatarURL())]}).then(async x => {
                                               message.react(await emojiBul("appEmojii_tik")).catch(err => {})
                                               setTimeout(() => {
                                                   x.delete().catch(err => {})
                                               }, 30000);
                                           })
                                          }).catch(err => {
                                               bekle.delete().catch(err => {})
                                               msg.delete().catch(err => {})
                                              message.channel.send(` **${botClient.user.tag}**, Başarısız! profil resmi güncelleyebilmem için biraz beklemem gerek!`).then(async x => {
                                               message.react(await emojiBul("appEmoji_carpi")).catch(err => {})
                                               setTimeout(() => {
                                                   x.delete().catch(err => {})
                                               }, 7500);
                                           })
                                          })
                                    });
                                    
                                    col.on('end', collected => {
                                        msg.delete().catch(err => {});
                                    });
                                }
                                if(botSetupint.customId == "selectName") {
                                    msg.edit({embeds: [embed.setDescription(` ${botClient.user} isimli botun yeni ismini belirtin. İşlemi iptal etmek için (**iptal**) yazabilirsiniz. (**Süre**: \`60 Saniye\`)`)],components: []})
                                    var isimfilter = m => m.author.id == message.member.id
                                    let col = msg.channel.createMessageCollector({filter: isimfilter, time: 60000, max: 1, errors: ["time"]})
        
                                    col.on('collect', async (m) => {
                                        if (m.content == ("iptal" || "i")) {
                                            msg.delete().catch(err => {});
                                            message.react(await emojiBul("appEmoji_carpi")).catch(err => {})
                                            await botSetupint.reply({content: ` İsim değiştirme işlemi iptal edildi.`, ephemeral: true})
                                            return;
                                          };
                                          let eskinick = botClient.user.username
                                          let bekle = await message.reply(`Bu işlem biraz uzun sürebilir, Lütfen bekleyin...`)
                                          let isim = m.content
                                          botClient.user.setUsername(isim).then(x => {
                                              bekle.delete().catch(err => {})
                                              msg.delete().catch(err => {})
                                              let logChannel = message.guild.kanalBul("guild-log")
                                              if(logChannel) logChannel.send({embeds: [embed.setFooter(`${tarihsel(Date.now())} tarihinde işleme koyuldu.`).setDescription(`${message.member} tarafından ${botClient.user} isimli botun ismi değiştirildi.\n**${eskinick}** \` ••❯ \` **${botClient.user.username}** olarak güncellendi.`)]})
                                              message.channel.send({embeds: [embed.setDescription(` Başarıyla! **${eskinick}** \` ••❯ \` **${botClient.user.username}** olarak değiştirildi.`)]}).then(async x => {
                                               message.react(await emojiBul("appEmojii_tik")).catch(err => {})
                                               setTimeout(() => {
                                                   x.delete().catch(err => {})
                                               }, 30000);
                                           })
                                          }).catch(err => {
                                               bekle.delete().catch(err => {})
                                               msg.delete().catch(err => {})
                                              message.channel.send(` **${botClient.user.tag}**, Başarısız! isim değiştirebilmem için biraz beklemem gerek!`).then(async x => {
                                               message.react(await emojiBul("appEmoji_carpi")).catch(err => {})
                                               setTimeout(() => {
                                                   x.delete().catch(err => {})
                                               }, 7500);
                                           })
                                          })
                                    });
                                    
                                    col.on('end', collected => {
                                        msg.delete().catch(err => {});
                                    });
                                }
                            })
                        })
           
                }
            })
        
            collector.on("end", async () => {
                msg.delete().catch(err => {})
            })
             
              }
    })
    }
    }
}
module.exports = Setup