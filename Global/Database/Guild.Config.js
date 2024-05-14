const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: {type:String, default:undefined},
  only:{type:Boolean, default:false},
  registerCommands:{type:Boolean, default:false},
  moderationCommands:{type:Boolean, default:false},
  statisticsCommands:{type:Boolean, default:false},
  globalCommands:{type:Boolean, default:false},
  slashCommands:{type:Boolean, default:false},

});

module.exports = model("Approval-GuildConfig", schema);
