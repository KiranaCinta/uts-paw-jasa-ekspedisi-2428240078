const express = require('express');
const router = express.Router();
const paketController = require('../controllers/paketController');
const cekApiKey = require('../middlewares/cekApiKey');

router.get('/', paketController.getAll);
router.get('/:id', paketController.getById);
router.post('/', cekApiKey, paketController.create);

module.exports = router;