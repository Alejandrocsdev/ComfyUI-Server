const { Router } = require('express');
const router = Router();
const multer = require('multer');
const s3Controller = require('../controllers/s3.controller');

const upload = multer({ storage: multer.memoryStorage() });

router.get('/list', s3Controller.list);
router.get('/download', s3Controller.download);
router.put('/upload', upload.single('file'), s3Controller.upload);
router.delete('/delete', s3Controller.delete);

module.exports = router;
