const runpodService = require('../services/runpod/service');
const podDb = require('../services/runpod/db');
const { asyncHandler } = require('../middlewares');

exports.getPods = asyncHandler(async (req, res) => {
  const data = await runpodService.getPods();
  res.json(data);
});

exports.getPod = asyncHandler(async (req, res) => {
  const { podId } = req.params;
  const data = await runpodService.getPod(podId);
  res.json(data);
});

exports.createPod = asyncHandler(async (req, res) => {
  const data = await runpodService.createPod();
  await podDb.create(data.id);
  res.status(201).json(data);
});

exports.terminatePod = asyncHandler(async (req, res) => {
  const { podId } = req.params;
  const data = await runpodService.terminatePod(podId);
  res.json(data);
});
