const runpodService = require('../services/runpod/service');
const { asyncHandler } = require('../middlewares');
const CustomError = require('../errors/CustomError');

const VALID_PORTS = ['8188', '8888'];

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
  try {
    const data = await runpodService.createPod();
    res.status(201).json(data);
  } catch (error) {
    const runpodError = error.response?.data?.error;
		if (runpodError) {
			return res.status(503).json({ message: runpodError });
		} else {
			throw error
		}
  }
});

exports.terminatePod = asyncHandler(async (req, res) => {
  const { podId } = req.params;
  const data = await runpodService.terminatePod(podId);
  res.json(data);
});

exports.pingPod = asyncHandler(async (req, res) => {
  const { podId } = req.params;
  const { port } = req.query;
  if (!VALID_PORTS.includes(port)) {
    throw new CustomError(400, 'port must be 8188 or 8888');
  }
  const reachable = await runpodService.pingPod(podId, port);
  res.json({ reachable });
});

exports.getBalance = asyncHandler(async (req, res) => {
  const data = await runpodService.getBalance();
  res.json(data);
});
