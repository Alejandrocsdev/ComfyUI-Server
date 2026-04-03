const { Router } = require('express');
const router = Router();

const comfyuiController = require('../controllers/comfyui.controller');

router.get('/history/:promptId', comfyuiController.getPrompt);
router.get('/server', comfyuiController.getServerStatus);

router.post('/prompt', comfyuiController.sendPrompt);
router.post('/server/start', comfyuiController.startServer);
router.post('/server/restart', comfyuiController.restartServer);
router.post('/server/stop', comfyuiController.stopServer);


module.exports = router;
