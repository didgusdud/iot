var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://52.79.164.177');
client.on('connect', ()=>{
	client.publish('topic1', 'hello, cws !');
	client.end();
});
