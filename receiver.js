var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://52.79.164.177');
var fs = require('fs');
 
client.on('connect', function () {
      client.subscribe('topic1');
});
 
client.on('message', function (topic, message) {
      data = JSON.parse(message);
      fs.writeFileSync(data.file, data.data);
      client.end();
});
