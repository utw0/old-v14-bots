const { Event } = require("../../../../Global/Structures/Default.Events");
const chalk = require('chalk')
const {Guild} = require("../../../../Global/Config/Guild")
class ready extends Event {
    constructor(client) {
        super(client, {
            name: "ready",
            enabled: true,
        });    
    }    

async onLoad() {
//require("../../Web")
 }
}    
module.exports = ready;
