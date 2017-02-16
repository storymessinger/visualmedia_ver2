var express = require('express');
var router = express.Router();
// var Project = require('../models/project_db');


router.get('/download',function(req,res){
    res.render('archive_download');
});

router.get('/weekly', function(req,res){
    res.render('archive_weekly');
});

module.exports = router;
