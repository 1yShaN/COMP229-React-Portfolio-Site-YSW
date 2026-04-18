var express = require('express');
var router = express.Router();

let projectsController = require('../controllers/projects');
let authController = require('../controllers/auth');

router.get('/', projectsController.list);
router.post(
	'/',
	authController.validateToken,
	authController.requireAdmin,
	projectsController.processAdd
);
router.get('/:id', projectsController.getById);
router.put(
	'/:id',
	authController.validateToken,
	authController.requireAdmin,
	projectsController.processEdit
);
router.delete(
	'/:id',
	authController.validateToken,
	authController.requireAdmin,
	projectsController.performDelete
);

module.exports = router;