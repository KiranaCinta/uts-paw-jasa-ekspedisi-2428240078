const express = require('express');
const router = express.Router();
const kurirController = require('../controllers/kurirController');

router.post('/', kurirController.create);
router.get('/', kurirController.getAll);

module.exports = router;