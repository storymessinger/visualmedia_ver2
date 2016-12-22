var express = require('express');
var app = express();
var port = process.env.PORT || 3002;

// setting pug as the view template engine
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// making the 'public' folder for the static assets folder
//app.use('/user', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

// middleware
//app.use(require('./middlewares/users'));

// 'C'ontroller of MV'C'
var controllers = require('./controllers');
app.use(controllers);

/*var p1 = require('./routes/p1')(app);
app.use('/p1',p1);

var p2 = require('./routes/p2');
app.use('/p2',p2);*/

app.listen(port, function(){
    console.log('connected to 3002 port');
});
