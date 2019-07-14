const functions = require('firebase-functions');
var express = require('express');
const axios = require('axios');
const bodyParser = require("body-parser");
const cors = require('cors');

var app = express();
app.use(cors({
    origin: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', (req, res) => {
    res.status(200).send('ok')
});
app.post('/api', (req, res) => {
        
});

exports.bot = functions.https.onRequest(app);
// app.listen(3000, () => {
//     console.log('Server Listening on http://localhost:3000/');
// });