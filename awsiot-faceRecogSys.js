var awsIot = require('aws-iot-device-sdk');

//device에서 실행되는 app object 생성
var faceRecogSys = awsIot.device({
    //인증에 필요한 것들
    keyPath: "./credentials/recogsys/b01af7c0a1-private.pem.key",
    certPath: "./credentials/recogsys/b01af7c0a1-certificate.pem.crt",
    caPath: "./credentials/recogsys/AmazonRootCA1.pem",
    clientId: "faceRecogSys",
    host: "ah41dui5zfkjy-ats.iot.ap-northeast-2.amazonaws.com"
});

//접속이 되면 connect 이벤트 발생
faceRecogSys.on('connect', function () {
    console.log('Face Recognition System connected');
    faceRecogSys.subscribe('faceRecog/request', function () {
        console.log('subscribing to the topic faceRecog/request !');
    })

    var registeredImage = ['gildong', 'simcheong', 'heungboo', 'nolboo'];
    faceRecogSys.on('message', function (topic, message) {
        console .log('Request:', message.toString());
        if (topic != 'faceRecog/request') return;
        var req = JSON.parse(message.toString());
        var id = registeredImage.indexOf(req.image);
        if (id != -1) {
            faceRecogSys.publish(req.notify, JSON.stringify({ 'image': req.image, 'command': 'unlock'}));
        } else {
            faceRecogSys.publish(req.notify, JSON.stringify({ 'image': req.image, 'command': 'reject'}));
        }
    })
});