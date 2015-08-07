var koa = require('koa');

var app = koa();

app.use(function * () {
    this.body = "Derp doop, darp dlop";
});

app.listen(3000);
