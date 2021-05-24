var awsIot = require('aws-iot-device-sdk');

//device에서 실행되는 app object 생성
var fire_management_system = awsIot.device({
    //인증에 필요한 것들
    keyPath: "./credentials/management/463e344b1f-private.pem.key",
    certPath: "./credentials/management/463e344b1f-certificate.pem.crt",
    caPath: "./credentials/management/AmazonRootCA1.pem",
    clientId: "fire_management_system",
    host: "ah41dui5zfkjy-ats.iot.ap-northeast-2.amazonaws.com"
});

//접속이 되면 connect 이벤트 발생
fire_management_system.on('connect', function () {
    console.log('fire_management_system connected');
    fire_management_system.subscribe('fire/alarm', function () {
        console.log('subscribing to the topic fire/alarm !');
    })

    var registeredImage = ['fire'];
    fire_management_system.on('message', function (topic, message) {
        console.log('Request:', message.toString());
        var req = JSON.parse(message.toString());
        if (topic != 'fire/alarm') return;
        else {
            fire_management_system.publish(req.notify, JSON.stringify({'activation command': 'activation'}));
            console.log('publish to fire/alert' + JSON.stringify({'fire_alert_message': 'alert'}));
            fire_management_system.publish('fire/alert', JSON.stringify({'fire_alert_message': 'alert'}));
        }
    })
});
