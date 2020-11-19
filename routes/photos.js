var express = require('express');
var passport = require('passport');
var photo_controller = require('../controllers/photo_controller');

var router = express.Router();

router.options('/create', cors());
router.post('/create', photo_controller.photo_create);

router.get('/location/:locationId', photo_controller.photo_get);

module.exports = router;