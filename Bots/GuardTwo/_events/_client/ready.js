const { Event } = require("../../../../Global/Structures/Default.Events");
const {Guild} = require("../../../../Global/Config/Guild")
class ready extends Event {
    constructor(client) {
        super(client, {
            name: "ready",
            enabled: true,
        });    
    }    

 async   onLoad() {
        _status(
            [

                {name:Guild.botStatus, type:3},

              ],
            ["dnd","online","idle"],
            {
                on: false,
                activities: 5000,
                status: 30000
            }
        )
        const guild = client.guilds.cache.get(Guild.ID)
        const channel = guild.channels.cache.get(Guild.botVoiceChannel)
 
    }
}    


function _status(activities, status, time) {
    if(!time.on) {
        client.user.setActivity(activities[0])
        client.user.setStatus(status[0])
    }  else {
        let i = 0;
        setInterval(() => {
            if(i >= activities.length) i = 0
            client.user.setActivity(activities[i])
            i++;
        }, time.activities);
    
        let s = 0;
        setInterval(() => {
            if(s >= activities.length) s = 0
            client.user.setStatus(status[s])
            s++;
        }, time.status);
    }
}

module.exports = ready;
