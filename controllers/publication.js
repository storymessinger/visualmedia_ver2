var express = require('express');
var router = express.Router();
// var Project = require('../models/project_db');

router.get('/',function(req,res){
    res.render('publication_list');
});

router.get('/domestic',function(req,res){
    res.render('publication_list');
});

router.get('/2016', function(req,res){
    res.render('publication_desc');
});

module.exports = router;
