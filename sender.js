var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://52.79.164.177');

var fs = require('fs');

file = 'peaches.txt';
msg = fs.readFileSync(file);

buf = {
    "file": file,
    "msg": msg,
};

client.on('connect', function () {
    client.publish('topic1', JSON.stringify(buf));
    client.end();
});
 
client.on('message', function (topic, message) {
      console.log(topic + ' : send');
      client.end();
});
