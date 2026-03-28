var express = require('express');
var router = express.Router();

let contactsController = require('../controllers/contact')

router.get('/', contactsController.list);
router.post('/', contactsController.processAdd);
router.get('/:id', contactsController.getById);
router.put('/:id', contactsController.processEdit);
router.delete('/:id', contactsController.performDelete);

module.exports = router;