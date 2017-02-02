var express = require('express');
var router = express.Router();
// var Project = require('../models/project_db');

router.get('/',function(req,res){
    res.render('news');
});

module.exports = router;
