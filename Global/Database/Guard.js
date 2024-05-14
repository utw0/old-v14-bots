const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: String,
  database:{type:Boolean, default:false},
  serverGuard:{type:Boolean, default:false},
  rolesGuard:{type:Boolean, default:false},
  channelsGuard:{type:Boolean, default:false},
  banKickGuard:{type:Boolean, default:false},
  emojiStickersGuard:{type:Boolean, default:false},
  UrlSpammer:{type:Boolean, default:false},
  webAndofflineGuard:{type:Boolean, default:false},
  SafedMembers:{type:Array, default:["852800814808694814"]},
  serverSafedMembers:{type:Array, default:["852800814808694814"]},
  roleSafedMembers:{type:Array, default:["852800814808694814"]},
  channelSafedMembers:{type:Array, default:["852800814808694814"]},
  banKickSafedMembers:{type:Array, default:["852800814808694814"]},
  emojiStickers:{type:Array, default:["852800814808694814"]},
});

module.exports = model("Guard", schema);
