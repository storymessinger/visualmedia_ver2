var express = require('express');
var router = express.Router();

router.get('/professor', function(req, res) {
    res.render('member_professor');
});
router.get('/student', function(req, res) {
    res.render('member_student');
});

module.exports = router;
