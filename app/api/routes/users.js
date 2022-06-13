const express = require('express');
// with the help of express.Router() we are using just routing constructor from express and nothing else
const router = express.Router();
const UserController = require('../controllers/users');

router.post('/register',UserController.create);
router.post('/login',UserController.login);

module.exports = router