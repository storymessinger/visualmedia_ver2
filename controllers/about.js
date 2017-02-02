var express = require('express');
var router = express.Router();
// var Project = require('../models/project_db');

router.get('/us',function(req,res){
    res.render('about_us');
});

router.get('/admission', function(req,res){
    res.render('about_admission');
});

module.exports = router;
