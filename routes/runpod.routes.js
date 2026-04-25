const { Router } = require('express');
const router = Router();

const runpodController = require('../controllers/runpod.controller');
const { addClient } = require('../sse');

// SSE stream — must be registered before /:podId to avoid "stream" matching as a param
router.get('/pods/stream', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const cleanup = addClient(res);
  req.on('close', cleanup);
});

router.get('/balance', runpodController.getBalance);
router.get('/ssh-port', runpodController.getSSHPort);
router.post('/ssh/exec', runpodController.execSSH);
router.get('/pods', runpodController.getPods);
router.get('/pods/:podId', runpodController.getPod);
router.get('/pods/:podId/ping', runpodController.pingPod);
router.post('/pods', runpodController.createPod);
router.post('/pods/:podId', runpodController.restartPod);
router.delete('/pods/:podId', runpodController.terminatePod);

module.exports = router;
