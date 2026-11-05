const express = require('express');
const router = express.Router();
const kurirController = require('../controllers/kurirController');
const cekApiKey = require('../middlewares/cekApiKey');

router.get('/', kurirController.getAll);
// router.get('/:id', prodiController.getById);
router.post('/', cekApiKey, kurirController.create);

module.exports = router;