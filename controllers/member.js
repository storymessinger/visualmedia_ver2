var express = require('express');
var router = express.Router();

router.get('/professor', function(req, res) {
    res.render('member_professor');
});
router.get('/students', function(req, res) {
    res.render('member_students');
});

module.exports = router;
