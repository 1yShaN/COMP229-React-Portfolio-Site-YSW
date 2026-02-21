var express = require('express');
var router = express.Router();

let projectsController = require('../controllers/projects')

router.get('/', projectsController.list);
router.post('/', projectsController.processAdd);
router.get('/:id', projectsController.getById);
router.put('/:id', projectsController.processEdit);
router.delete('/:id', projectsController.performDelete);

module.exports = router;