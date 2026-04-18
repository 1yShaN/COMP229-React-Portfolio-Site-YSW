var express = require('express');
var router = express.Router();

let servicesController = require('../controllers/services');
let authController = require('../controllers/auth');

router.get('/', servicesController.list);
router.post(
	'/',
	authController.validateToken,
	authController.requireAdmin,
	servicesController.processAdd
);
router.get('/:id', servicesController.getById);
router.put(
	'/:id',
	authController.validateToken,
	authController.requireAdmin,
	servicesController.processEdit
);
router.delete(
	'/:id',
	authController.validateToken,
	authController.requireAdmin,
	servicesController.performDelete
);

module.exports = router;