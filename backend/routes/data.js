const express = require('express');
const multer = require('multer');
const { ingestData, transformData } = require('../controllers/dataController');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/ingest', upload.single('file'), ingestData);
router.post('/transform', transformData);

module.exports = router;

