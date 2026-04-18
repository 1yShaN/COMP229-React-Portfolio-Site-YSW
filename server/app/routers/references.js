var express = require('express');
var router = express.Router();

let referencesController = require('../controllers/references');
let authController = require('../controllers/auth');

router.get('/', referencesController.list);
router.post('/', authController.validateToken, authController.requireAdmin, referencesController.processAdd);
router.get('/:id', referencesController.getById);
router.put('/:id', authController.validateToken, authController.requireAdmin, referencesController.processEdit);
router.delete('/:id', authController.validateToken, authController.requireAdmin, referencesController.performDelete);

module.exports = router;