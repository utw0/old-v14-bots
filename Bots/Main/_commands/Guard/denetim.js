
const { EmbedBuilder } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const tagaldir = require("../../../../Global/Database/SystemDB/tagaldir")
const children = require("child_process");

class denetim extends Command {
    constructor(client) {
        super(client, {
            name: "denetim",
            description: "Sunucu denetimi",
            usage: ".denetim",
            category: "Guard",
            aliases: ["d","denetim"],
            enabled: true,
            guildOwner:true,
            developer : true
        });
    }
    


   async onRequest (client, message, args,embed) {
    if (!args[0] || !args[0].toLowerCase() === "rol" && !args[0].toLowerCase() === "kanal") return message.channel.send({ embeds: [embed.setDescription(`Lütfen \`rol/kanal\` olmak üzere geçerli bir eylem belirtiniz`)]})
    if (args[0].toLowerCase() === "rol") {
      const audit = await message.guild.fetchAuditLogs({ type: 32 }).then(a => a.entries)
      const denetim = audit.filter(e => !e.executor.bot && Date.now() - e.createdTimestamp < 1000 * 60 * 60*3).map(e => ` Rol İsim: ${e.changes.filter(e => e.key === 'name').map(e => e.old)}\n Rol id: ${e.target.id}\n Silen: ${e.executor.tag}\n────────────────────────────────────────────────────────────────────────`)
      if (!denetim.length) return message.channel.send({ embeds: [embed.setDescription(`Son **3** saat de silinmiş herhangi bir rol bulunamadı!`)]})
      let list = chunkify(denetim,10);
        list.forEach(x=> {
            message.channel.send(Discord.Formatters.codeBlock("js", x.join("\n")));
        })    } else if (args[0].toLowerCase() === "kanal") {
      const audit = await message.guild.fetchAuditLogs({ type: 12  }).then(a => a.entries)
      const denetim = audit.filter(e =>!e.executor.bot && Date.now() - e.createdTimestamp < 1000 * 60 * 60*3).map(e => ` Kanal İsim: ${e.changes.filter(e => e.key === 'name').map(e => e.old)}\n Kanal id: ${e.target.id}\n Silen: ${e.executor.tag}\n────────────────────────────────────────────────────────────────────────`)
      if (!denetim.length) return message.channel.send({ embeds: [embed.setDescription(`Son **3** saat de silinmiş herhangi bir kanal bulunamadı!`)]})
      let list = chunkify(denetim,10);
        list.forEach(x=> {
            message.channel.send(Discord.Formatters.codeBlock("js", x.join("\n")));
        })

    }
    }
}
function clean(string) {
    if (typeof text === "string") {
        return string.replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
    } else {
        return string;
    }
}
module.exports = denetim
