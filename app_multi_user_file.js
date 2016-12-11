var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

/* this app is going to use bodyparser for post*/
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(session({
    secret: '123dfasdf3df3aadfD',
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
}));

// use for passport
app.use(passport.initialize());
app.use(passport.session());

app.get('/count', function (req, res) {
    if (req.session.count) {
        req.session.count++;
    } else {
        req.session.count = 1;
    }
    res.send('count :' + req.session.count);
})

    

var users = [
    {
        username: 'egoing',
        password: 'qp0My7BNvunzQ+mRfveNL5Vo21PbwChd6+opJ2AyLlxglS3c1JgvAv3RP1ZSNB7Kw5618BZ2lPCa+tOL7eD6MTXad4aDul+7TTibUKlEh67QUTHuBH3J5GaSEWzmUMkla0Tgvxzo+GbTiDRJ+hAbpuTVV5ZjHLCUfzF5xFoDMsg=',
        salt: 'axmryXo0XnyfyiCUi4zYUNqzVv9xktzWKM/LPd4CXCGbjYUa2fQyPI89DTkR3coJGE+ow5AUEHSb/gg9rowLxQ==',
        displayName: 'Egoing'
    }
];


app.get('/auth/logout', function (req, res) {
    delete req.session.displayName;
    req.session.regenerate(function () {
        res.redirect('/welcome');
    });
})
app.get('/welcome', function (req, res) {
    if (req.session.displayName) {
        res.send(`
            <h1>Hello, ${req.session.displayName}</h1>
            <a href="/auth/logout">logout</a>
        `);
    } else {
        res.send(`
        <h1>Welcome</h1>
        <p><a href="/auth/login">Please login</a></p>
        <p><a href="/auth/register">Register</a></p>
        `)
    }
});

app.post('/auth/register', function (req, res) {
    hasher({
        password: req.body.password
    }, function (err, pass, salt, hash) {
        var user = {
            username: req.body.username,
            password: hash,
            salt: salt,
            displayName: req.body.displayName
        };
        users.push(user);
        req.session.displayName = req.body.displayName;
        req.session.save(function () {
            res.redirect('/welcome');
        })

    });
});

// done 이 false가 아니라면 이게 실행
passport.serializeUser(function(user, done) {
    console.log('serializeUser', user);
    //session에 이렇게username으로 저장이 된다. 보통 user.id로 하는게 일반적인듯. 
  done(null, user.username);
});

// done 이 false라면 이게 실행
passport.deserializeUser(function(id, done) {
    console.log('deserializeUser', id);
    for (var i=0; i<users.length; i++){
        var user = users[i];
        if(user.username === id){
            done(null, user);
        }
//  User.findById(id, function(err, user) {
//    done(err, user);
  });
});

passport.use(new LocalStrategy {
    function(username, password, done) {
    var uname = username; 
    var pwd = password; 
    
    for (var i=0; i<users.length; i++){
        var user = users[i];
        if(uname === user.username) {
            return hasher({password: pwd, salt:user.salt}, function(err, pass, salt, hash){
                if(hash === user.password){
                    // 로그인에 성공
                    done(null, user);
                } else {
                    done(null, false);
                    res.send(`No user or incorrect password
                        <p><a href="/auth/login">login</a></p>`)
                }
            });
        }
    }
    done(null, false);
    }

});

app.post('/auth/login',
// local 전략을 사용한다
passport.authenticate('local', {
    successRedirect: '/welcome',
    failureRedirect: '/auth/login',
    // 요너석은 사용자에게 인증에 실패했다는 정보를 딱한번 주는방법 (복잡도가 살짝 있다)
    failureFlash: false
})
);

/*
app.post('/auth/login', function(req,res){
    var uname = req.body.username;
    var pwd = req.body.password;
    
//    for (user in users) {
//        console.log(user);
    for (var i=0; i<users.length; i++){
        var user = users[i];
        if(uname === user.username) {
            return hasher({password: pwd, salt:user.salt}, function(err, pass, salt, hash){
                if(hash === user.password){
                    req.session.displayName = user.displayName;
                    req.session.save(function(){
                        res.redirect('/welcome');
                    })
                } else {
                    res.send(`No user or incorrect password
                        <p><a href="/auth/login">login</a></p>`)
                }
            });
        }
    }
    res.send(`No user or incorrect password
        <p><a href="/auth/login">login</a></p>`)
});*/

/*        if(uname === user.username && sha256(pwd+user.salt) === user.password){
            req.session.displayName = user.displayName;
            return req.session.save(function(){
                res.redirect('/welcome');
            });
            } 
        }
    res.send(`No user or incorrect password
        <p><a href="/auth/login">login</a></p>`)
});*/

app.get('/auth/register', function (req, res) {
    var output = `
        <h1> Login </h1>
        <form action="/auth/register" method="post">
            <p>
                <input type="text" name="username" placeholder="username">
            </p>
            <p>
                <input type="password" name="password" placeholder="password">
            </p>
            <p>
                <input type="text" name="displayName" placeholder="displayName">
            </p>
            <p>
                <input type="submit">
            </p>
        </form>
    `;

    res.send(output);

})
app.get('/auth/login', function (req, res) {
    var output = `
        <h1> Login </h1>
        <form action="/auth/login" method="post">
            <p>
                <input type="text" name="username" placeholder="username">
            </p>
            <p>
                <input type="password" name="password" placeholder="password">
            </p>
            <p>
                <input type="submit">
            </p>
        </form>
    `;
    res.send(output);
});

app.listen(3003, function () {

    console.log('Connected 3003 port');
})