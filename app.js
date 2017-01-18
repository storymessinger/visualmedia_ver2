var express = require('express');
var app = express();
var port = process.env.PORT || 3007;

//
// setting pug as the view template engine
// app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// Makes pretty html for pug file
app.locals.pretty = true;

// making the 'public' folder for the static assets folder
//app.use('/user', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));
// 제길..실제 파일시스템에 존재하지않는 가상경로를 작성하려면, 아래에 표시된 것처럼
// 정적 디렉토리에 대한 마운트 경로를 지정해야 한단다
// 즉 이걸 안하면 project/ 이후의 경로에 static이 지정되지 않음
app.use('/project', express.static(__dirname + '/public'));
app.use('/member', express.static(__dirname + '/public'));

// middleware
//app.use(require('./middlewares/users'));

// 'C'ontroller of MV'C'
// 기본으로 index.js 를 찾고 그걸 로딩한다
var controllers = require('./controllers');
app.use(controllers);

/*var p1 = require('./routes/p1')(app);
app.use('/p1',p1);

var p2 = require('./routes/p2');
app.use('/p2',p2);*/

app.listen(port, function(){
    console.log('connected to 3007 port');
});
