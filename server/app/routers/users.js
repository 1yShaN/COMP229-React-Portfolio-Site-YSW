var express = require('express');
var router = express.Router();

let usersController = require('../controllers/users');
let authController = require('../controllers/auth');

router.get('/', usersController.list);
router.post('/', usersController.processAdd);
router.get('/:id', usersController.getById);
router.put('/:id', authController.validateToken, usersController.processEdit);
router.delete('/:id', authController.validateToken, usersController.performDelete);

module.exports = router;