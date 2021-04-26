var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://52.79.164.177');
var fs = require('fs');
 
client.on('connect', function () {
      client.subscribe('topic1');
});
 
client.on('message', function (topic, message) {
      data = message;
      fs.writeFileSync('new.txt', data);
      client.end();
});
