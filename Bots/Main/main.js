const { Approval } = require('../../Global/Structures/Default.Clients.js');
const {Bots} = require("../../Global/Config/Guild").Guild
let client = global.client = new Approval({
    token: Bots.mainToken,
    prefix: Bots.prefixs,
    owners: Bots.devs,
    MongoURI: Bots.MongoDb,
    _dirname: "Main"
});


client.fetchCommands(true, true);
client.fetchEvents(true)
client.connect()
