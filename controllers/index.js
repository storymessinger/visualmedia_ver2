var express = require('express');
var router = express.Router();

// projects related
router.use('/project', require('./project'));
// members related
router.use('/member', require('./member'));

router.get('/',function(req,res){
    res.render('index');
});

module.exports = router;
