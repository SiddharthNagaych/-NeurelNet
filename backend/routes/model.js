const express = require('express');
const { trainModel, freezeModel } = require('../controllers/modelController');

const router = express.Router();

router.post('/train', trainModel);
router.post('/freeze', freezeModel);

module.exports = router;
