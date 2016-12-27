var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var _storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // if(파일의 형식이 이미지면)
        // 어디에다가 넣고 cb( );
        // else if (파일의 형식이 텍스트면)
        // 어디에다가 넣고 cb();
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        //if 만약 이미 파일이 존재한다면...등의 조건 가능
        cb(null, file.originalname);
    }
});
var upload = multer({
    storage: _storage
});
var fs = require('fs');

// BASIC mysql connection
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'visualmedia',
    database: 'o2'
});
connection.connect();

// Makes pretty html for pug files 
app.locals.pretty = true;

// Using pug as an view engine
app.set('view engine', 'pug');
//Going to use this directory for views file
app.set('views', './views_mysql');

// setting to use the static page
app.use('/user', express.static('uploads/'));
// setting body-parser. Able to use body for post
app.use(bodyParser.urlencoded({
    extended: false
}));


app.get('/upload', function (req, res) {
    res.render('upload');
});

app.post('/upload', upload.single('userfile'), function (req, res) {
    res.send('Uploaded : ' + req.file.filename);
});

app.get(['/topic', '/topic/:id'], function (req, res) {
    var sql = 'SELECT id, title FROM topic';
    connection.query(sql, function (err, rows, fields) {
        var id = req.params.id;
        if (id && (id != 'add')) {
            var sql = 'SELECT * FROM topic WHERE id=?';
            connection.query(sql, [id], function (err, rows_2, fields) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.render('view', {
                        topics: rows,
                        topic: rows_2[0],
                    });
                }
            })

        } else if (id && (id == 'add')) {
            var sql = 'SELECT id, title FROM topic';
            connection.query(sql, function (err, topics, fields) {
                res.render('add', {
                    topics: rows,
                    //                    topic:topics[0],
                });
            })
        } else {
            res.render('view', {
                topics: rows,
            });
        }
    });
});

app.get(['/topic/:id/delete'], function (req, res) {
    var sql = 'SELECT id, title FROM topic';
    connection.query(sql, function (err, rows, fields) {
        var sql = 'SELECT * FROM topic WHERE id=?';
        var id = req.params.id;
        connection.query(sql, [id], function (err, topic) {
            if (err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
            } else {
                if (topic.length === 0) {
                    console.log('There is no id.');
                    res.status(500).send('Internal Server Error');
                } else {
                    res.render('delete', {
                        topics: rows,
                        topic: topic[0]
                    })

                }
            }
        })
    })
})

app.get(['/topic/:id/edit'], function (req, res) {

    var sql = 'SELECT id, title FROM topic';

    connection.query(sql, function (err, rows, fields) {

        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        var id = req.params.id;
        if (id) {
            var sql = 'SELECT * FROM topic WHERE id=?';
            connection.query(sql, [id], function (err, rows_2, fields) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.render('edit', {
                        topics: rows_2,
                        topic: rows_2[0],
                    });
                }
            })

        } else {
            console.log("THERE IS NO ID");
            res.status(500).send('Internal Server Error');
        }
    });
});

app.post('/topic/add', function (req, res) {
    var sql = 'INSERT INTO topic (title, description, author) VALUES (?,?,?)';

    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;

    connection.query(sql, [title, description, author], function (err, result, fields) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/topic/' + result.insertId);
        }

    })
});

app.post('/topic/:id/edit', function (req, res) {
    var sql = 'UPDATE topic SET title=?, description=?, author=? WHERE id=?';

    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;
    var id = req.params.id;
    connection.query(sql, [title, description, author, id], function (err, result, fields) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/topic/' + id);
        }

    })
});

app.post('/topic/:id/delete', function (req, res) {
    var id = req.params.id;
    var sql = 'DELETE FROM topic WHERE id=?';
    connection.query(sql, [id], function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/topic');
        }
    })
})

app.listen(3000, function () {
    console.log("Connected, 3000 port :)");
});