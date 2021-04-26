var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://52.79.164.177');
var fs = require('fs');
 
client.on('connect', ()=> {
      client.subscribe('topic1', ()=>{console.log('subscribe to topic1');});
});
 
client.on('message', (topic, message)=> {
      data = message;
      fs.writeFileSync('new.txt', data.toString());
      client.end();
});
