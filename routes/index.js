const { Router } = require('express');
const router = Router();

const usersRoutes = require('./users.routes');
const comfyuiRoutes = require('./comfyui.routes');
const runpodRoutes = require('./runpod.routes');

router.use('/users', usersRoutes);
router.use('/comfyui', comfyuiRoutes);
router.use('/runpod', runpodRoutes);

module.exports = router;
