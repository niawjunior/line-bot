const functions = require('firebase-functions');
const bodyParser = require("body-parser");
const cors = require('cors');
const express = require('express');
const line = require('@line/bot-sdk');
var app = express();
app.use(cors({
    origin: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

require('dotenv').config();
const config = {
    channelAccessToken: '',
    channelSecret: ''
};

const client = new line.Client(config);

var ping = require('ping');

app.post('/api', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

function handleEvent(event) {
    console.log(event);
    if (event.type === 'message' && event.message.type === 'text') {
        handleMessageEvent(event);
    } else {
        return Promise.resolve(null);
    }
}

function handleMessageEvent(event) {
    var msg1 = {
        type: 'text',
        text: 'เว็บยังใช้งานไม่ได้'
    };
    var http = require('https');
    http.get('https://pasupol.com', function (res) {
        return;
    }).on('error', function(e) {
        return client.replyMessage(event.replyToken, msg1)    
    });
}

exports.bot = functions.https.onRequest(app);
// app.listen(3000, () => {
//     console.log('Server Listening on http://localhost:3000/wallet');
// });


