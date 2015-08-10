var express = require('express');

var app = express();
var db = require('./db');

app.get('/api/users/:userId', function (req, res, next) {
    db.users.find(req.params.userId, function (err, user) {
        if (err) {
            next(err);
        }
        else {
            res.send(user);
        }
    })
});

app.get('/api/users', function (req, res) {
    var users = new Promise(function (resolve, reject) {
        db.users.all(function (err, users) {
            if (err)
                reject(err);
            else
                resolve(users);
        });
    })
    .then(function (users) {
        return Promise.all(users.map(function (userId, index) {
            return new Promise(function (resolve, reject) {
                db.users.find(userId, function (err, user) {
                    if (err)
                        reject(err);
                    else {
                        resolve(user);
                    }
                })
            })
        }));
    })
    .then(function (users) {
        res.send(users);
    })
    .catch(function (err) {
        res.send(err);
    });
});

app.listen(3000, function () {
    console.log("Listening at", 3000);
});
