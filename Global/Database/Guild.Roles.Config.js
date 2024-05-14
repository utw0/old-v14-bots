const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID:String,
  kurucuPerms:{type:Array, default:[]},
  üstYönetimPerms:{type:Array, default:[]},
  ortaYönetimPerms:{type:Array, default:[]},
  altYönetimPerms:{type:Array, default:[]},
  unregisterRoles:{type:Array, default:[]},
  manRoles:{type:Array, default:[]},
  womanRoles:{type:Array, default:[]},
  boosterRole:{type:String, default:undefined},
  botCommandsRole:{type:String, default:undefined},
  registerStaffRole:{type:String, default:undefined},
  banStaffRole:{type:String, default:undefined},
  jailedStaffRole:{type:String, default:undefined},
  chatMuteStaffRole:{type:String, default:undefined},
  voiceMuteStaffRole:{type:String, default:undefined},
  suspectRole:{type:String, default:undefined},
  bannedTagRole:{type:String, default:undefined},
  jailedRole:{type:String, default:undefined},
  botRole:{type:String, default:undefined},
  chatMutedRole:{type:String, default:undefined},
  voiceMutedRole:{type:String, default:undefined},
});

module.exports = model("Approval-GuildRolesConfig", schema);
