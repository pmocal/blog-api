var express = require('express');
var router = express.Router();

var commentsRouter = require('./routes/comments');

var post_controller = require('../controllers/post_controller');

router.post('/', post_controller.index);

router.post('/create', passport.authenticate('jwt', {session: false}), post_controller.post_create);

router.use('/:postId/comments', commentsRouter);

router.get('/:postId', post_controller.post_get);

router.post('/:postId/update', passport.authenticate('jwt', {session: false}), post_controller.post_update);

router.delete('/postId', passport.authenticate('jwt', {session: false}), post_controller.post_delete);

module.exports = router;