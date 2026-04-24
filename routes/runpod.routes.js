const { Router } = require('express');
const router = Router();

const runpodController = require('../controllers/runpod.controller');

router.get('/pods', runpodController.getPods);
router.get('/pods/:podId', runpodController.getPod);
router.post('/pods', runpodController.createPod);
router.delete('/pods/:podId', runpodController.terminatePod);

module.exports = router;
