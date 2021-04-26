var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://52.79.164.177');

var fs = require('fs');

file = 'sea.jpg';
data = fs.readFileSync(file);

buf = {
    "file": file,
    "data": data,
};

client.on('connect', function () {
    client.subscribe('topic1');
    client.publish('topic1', JSON.stringify(buf));
    client.end();
});
 
client.on('message', function (topic, message) {
      console.log(topic + ' : send');
      client.end();
});
