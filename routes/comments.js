var express = require('express');
var router = express.Router({mergeParams: true});

var comment_controller = require('../controllers/comment_controller');

/* GET users listing. */
router.get('/', comment_controller.index);

router.post('/create', comment_controller.comment_create);

router.get('/:commentId', comment_controller.comment_get);

router.delete('/:commentId', passport.authenticate('jwt', {session: false}), comment_controller.comment_delete);

module.exports = router;