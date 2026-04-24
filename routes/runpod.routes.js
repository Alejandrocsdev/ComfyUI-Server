const { Router } = require('express');
const router = Router();

const runpodController = require('../controllers/runpod.controller');

router.post('/create', runpodController.createPod);
router.post('/terminate', runpodController.terminatePod);

module.exports = router;
