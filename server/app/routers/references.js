var express = require('express');
var router = express.Router();

let referencesController = require('../controllers/references')

router.get('/', referencesController.list);
router.post('/', referencesController.processAdd);
router.get('/:id', referencesController.getById);
router.put('/:id', referencesController.processEdit);
router.delete('/:id', referencesController.performDelete);

module.exports = router;