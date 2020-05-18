var express = require('express');
var passport = require('passport');

var post_controller = require('../controllers/post_controller');
var commentsRouter = require('./comments');

var router = express.Router();

router.get('/', post_controller.index);

router.post('/create', post_controller.post_create);

router.get('/:postId', post_controller.post_get);

router.use('/:postId/comments', commentsRouter);

// router.post('/:postId/update', post_controller.post_update);

router.delete('/postId', post_controller.post_delete);

module.exports = router;