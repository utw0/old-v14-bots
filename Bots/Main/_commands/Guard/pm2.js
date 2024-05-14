
const { EmbedBuilder } = require("discord.js");
const { Command } = require("../../../../Global/Structures/Default.Commands");
const { post } = require("node-superfetch");
const {Guild} = require("../../../../Global/Config/Guild")
const tagaldir = require("../../../../Global/Database/SystemDB/tagaldir")
const children = require("child_process");

class Pm2 extends Command {
    constructor(client) {
        super(client, {
            name: "Pm2",
            description: "manuel kod denemeleri için",
            usage: ".pm2",
            category: "Approval",
            aliases: ["pm2","pm"],

            enabled: true,

            developer : true
        });
    }
    

    onLoad(client) {
    
    }

   async onRequest (client, message, args) {
    const ls = children.exec(`pm2 ${args.join(' ')}`);
    ls.stdout.on('data', async function (data) {
        const { body } = await post("https://hastebin.com/documents").send(data);
        let embed = new EmbedBuilder().addFields([{ name: "Output", value: `https://hastebin.com/${body.key}.js`, inline: true }])
        message.channel.send({embeds:[embed]})    
    });
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
module.exports = Pm2
