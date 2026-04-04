const { Router } = require('express');
const router = Router();

const comfyuiController = require('../controllers/comfyui.controller');

router.get('/image/:promptId', comfyuiController.getImage);
router.get('/server', comfyuiController.getServerStatus);
router.get('/server/log', comfyuiController.getServerLog);

router.post('/prompt', comfyuiController.sendPrompt);
router.post('/server/start', comfyuiController.startServer);
router.post('/server/stop', comfyuiController.stopServer);


module.exports = router;
