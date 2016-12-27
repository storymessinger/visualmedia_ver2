// var express = require('express');
// var app = express();
//
// BASIC mysql connection
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'visualmedia',
    database: 'vml'
});
connection.connect();

module.exports.get = function(id_given, cb){
    var sql = 'SELECT * FROM projects WHERE id BETWEEN ? AND ?';
    // console.log(id_given);
    var id_1 = 5 * (id_given-1);
    var id_2 = 5 * (id_given);

    connection.query(sql, [id_1, id_2], cb);
};




//
// app.get(['/topic', '/topic/:id'], function (req, res) {
//     var sql = 'SELECT id, title FROM topic';
//     connection.query(sql, function (err, rows, fields) {
//         var id = req.params.id;
//         if (id && (id != 'add')) {
//             var sql = 'SELECT * FROM topic WHERE id=?';
//             connection.query(sql, [id], function (err, rows_2, fields) {
//                 if (err) {
//                     console.log(err);
//                     res.status(500).send('Internal Server Error');
//                 } else {
//                     res.render('view', {
//                         topics: rows,
//                         topic: rows_2[0],
//                     });
//                 }
//             })
//
//         } else if (id && (id == 'add')) {
//             var sql = 'SELECT id, title FROM topic';
//             connection.query(sql, function (err, topics, fields) {
//                 res.render('add', {
//                     topics: rows,
//                     //                    topic:topics[0],
//                 });
//             })
//         } else {
//             res.render('view', {
//                 topics: rows,
//             });
//         }
//     });
// });
//
// app.get(['/topic/:id/delete'], function (req, res) {
//     var sql = 'SELECT id, title FROM topic';
//     connection.query(sql, function (err, rows, fields) {
//         var sql = 'SELECT * FROM topic WHERE id=?';
//         var id = req.params.id;
//         connection.query(sql, [id], function (err, topic) {
//             if (err) {
//                 console.log(err);
//                 res.status(500).send('Internal Server Error');
//             } else {
//                 if (topic.length === 0) {
//                     console.log('There is no id.');
//                     res.status(500).send('Internal Server Error');
//                 } else {
//                     res.render('delete', {
//                         topics: rows,
//                         topic: topic[0]
//                     })
//
//                 }
//             }
//         })
//     })
// })
//
// app.get(['/topic/:id/edit'], function (req, res) {
//
//     var sql = 'SELECT id, title FROM topic';
//
//     connection.query(sql, function (err, rows, fields) {
//
//         if (err) {
//             console.log(err);
//             res.status(500).send('Internal Server Error');
//         }
//         var id = req.params.id;
//         if (id) {
//             var sql = 'SELECT * FROM topic WHERE id=?';
//             connection.query(sql, [id], function (err, rows_2, fields) {
//                 if (err) {
//                     console.log(err);
//                     res.status(500).send('Internal Server Error');
//                 } else {
//                     res.render('edit', {
//                         topics: rows_2,
//                         topic: rows_2[0],
//                     });
//                 }
//             })
//
//         } else {
//             console.log("THERE IS NO ID");
//             res.status(500).send('Internal Server Error');
//         }
//     });
// });
//
// app.post('/topic/add', function (req, res) {
//     var sql = 'INSERT INTO topic (title, description, author) VALUES (?,?,?)';
//
//     var title = req.body.title;
//     var description = req.body.description;
//     var author = req.body.author;
//
//     connection.query(sql, [title, description, author], function (err, result, fields) {
//         if (err) {
//             console.log(err);
//             res.status(500).send('Internal Server Error');
//         } else {
//             res.redirect('/topic/' + result.insertId);
//         }
//
//     })
// });
//
// app.post('/topic/:id/edit', function (req, res) {
//     var sql = 'UPDATE topic SET title=?, description=?, author=? WHERE id=?';
//
//     var title = req.body.title;
//     var description = req.body.description;
//     var author = req.body.author;
//     var id = req.params.id;
//     connection.query(sql, [title, description, author, id], function (err, result, fields) {
//         if (err) {
//             console.log(err);
//             res.status(500).send('Internal Server Error');
//         } else {
//             res.redirect('/topic/' + id);
//         }
//
//     })
// });
//
// app.post('/topic/:id/delete', function (req, res) {
//     var id = req.params.id;
//     var sql = 'DELETE FROM topic WHERE id=?';
//     connection.query(sql, [id], function (err, result) {
//         if (err) {
//             console.log(err);
//             res.status(500).send('Internal Server Error');
//         } else {
//             res.redirect('/topic');
//         }
//     })
// })
//
