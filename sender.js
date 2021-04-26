var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://52.79.164.177');

var fs = require('fs');

file = 'peaches.txt';
data = fs.readFileSync(file);
console.log('동기적 읽기 ' + data);
buf = {
    "f_name": file,
    "data": data,
};

client.on('connect', function () {
    client.subscribe('topic1');
    client.publish('topic1', data);
});
 
client.on('message', function (topic, message) {
      console.log(topic + ' : send');
      client.end();
});
