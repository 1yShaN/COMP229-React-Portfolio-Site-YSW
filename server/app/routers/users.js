var express = require('express');
var router = express.Router();

let usersController = require('../controllers/users')

router.get('/', usersController.list);
router.post('/', usersController.processAdd);
router.get('/:id', usersController.getById);
router.put('/:id', usersController.processEdit);
router.delete('/:id', usersController.performDelete);

module.exports = router;