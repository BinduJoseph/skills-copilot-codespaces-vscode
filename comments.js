//Create Web Server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
//Create Web Server
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/listUsers', function (req, res) {
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
});
app.post('/addUser', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data["user4"] = req.body;
        console.log(data);
        res.end(JSON.stringify(data));
    });
});
app.get('/:id', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        var users = JSON.parse(data);
        var user = users["user" + req.params.id];
        console.log(user);
        res.end(JSON.stringify(user));
    });
});
var id = 2;
app.delete('/deleteUser', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        delete data["user" + id];
        console.log(data);
        res.end(JSON.stringify(data));
    });
});
var user = {
    "user4": {
        "name": "mohit",
        "password": "password4",
        "profession": "teacher",
        "id": 4
    }
};
app.post('/addUser', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data["user4"] = user["user4"];
        console.log(data);
        res.end(JSON.stringify(data));
    });
});
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
});