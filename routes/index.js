const express = require('express');
const router = express.Router();
const User = require('./../models/user');

router.get('/logout', function(req, res){
  req.logout();
});

module.exports = router;