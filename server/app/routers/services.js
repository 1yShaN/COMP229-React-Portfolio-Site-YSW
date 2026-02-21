var express = require('express');
var router = express.Router();

let servicesController = require('../controllers/services')

router.get('/', servicesController.list);
router.post('/', servicesController.processAdd);
router.get('/:id', servicesController.getById);
router.put('/:id', servicesController.processEdit);
router.delete('/:id', servicesController.performDelete);

module.exports = router;