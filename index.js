var co = require('co');
var express = require('express');

var app = express();
var db = require('./db-with-promises');

app.get('/api/users/:userId', co.wrap(function * (req, res) {
    var user = yield db.users.find(req.params.userId);

    res.send(user);
}));

app.get('/api/users', co.wrap(function * (req, res) {
    var users = yield db.users.all();

    // We can do async work in a synchronous manner
    for (var i = 0; i < users.length; i++) {
        users[i] = yield db.users.find(users[i]);
    }

    res.send(users);
}));

// Alternatively
app.get('/api/users', co.wrap(function * (req, res) {
    var users = yield db.users.all();

    // The Co module can unwrap arrays of promises
    users = yield users.map(function (userId) {
        return db.users.find(userId);
    });

    res.send(users)
}));

app.listen(3000, function () {
    console.log("Listening at", 3000);
});
