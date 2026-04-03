const { Router } = require('express');
const router = Router();

const usersRoutes = require('./users.routes');
const comfyuiRoutes = require('./comfyui.routes');

router.use('/users', usersRoutes);
router.use('/comfyui', comfyuiRoutes);

module.exports = router;
