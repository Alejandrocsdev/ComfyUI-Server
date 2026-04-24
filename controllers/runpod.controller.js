const runpodService = require('../services/runpod.service');
const { asyncHandler } = require('../middlewares');
const CustomError = require('../errors/CustomError');

exports.createPod = asyncHandler(async (req, res) => {
  const data = await runpodService.createPod();
  res.status(201).json(data);
});

exports.terminatePod = asyncHandler(async (req, res) => {
  const { podId } = req.body;
  if (!podId) throw new CustomError(400, 'podId is required');
  const data = await runpodService.terminatePod(podId);
  res.json(data);
});
