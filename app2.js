var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://52.79.164.177');

client.on('connect', ()=>{
	client.subscribe('topic1', ()=>{console.log('subscribe to topic1');});
	client.end();
});
