var express = require('express');
var router = express.Router();
var Project = require('../models/project_db');

router.get('/:id', function(req, res) {

    Project.get(req.params.id, function(err, data){

        if(err){
        }
        // checking it in the console
        console.log(data);

        res.render('project',{
            //안에 들어갈거 : 여기서 정의된거
            data:data
        });
    });
});

module.exports = router;
