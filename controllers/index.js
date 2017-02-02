var express = require('express');
var router = express.Router();

// projects related
router.use('/project', require('./project'));
// members related
router.use('/member', require('./member'));
// publication related
router.use('/publication', require('./publication'));
// archive related
router.use('/archive', require('./archive'));
// news related
router.use('/news', require('./news'));
// about related
router.use('/about', require('./about'));

router.get('/',function(req,res){
    res.render('index');
});

module.exports = router;
