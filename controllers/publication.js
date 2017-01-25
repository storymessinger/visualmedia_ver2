var express = require('express');
var router = express.Router();
// var Project = require('../models/project_db');

router.get('/2016', function(req,res){
    res.render('project_publication');
});

module.exports = router;
