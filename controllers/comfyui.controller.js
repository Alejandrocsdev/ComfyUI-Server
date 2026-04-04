const comfyuiService = require('../services/comfyui/service');
const comfyuiHelper = require('../services/comfyui/helper');

const { asyncHandler } = require('../middlewares');

const CUstomError = require('../errors/CustomError');

exports.getImage = asyncHandler(async (req, res) => {
  const { promptId } = req.params;
  const data = await comfyuiService.getHistory(promptId);
  const image = await comfyuiHelper.getImage(data, promptId);
  if (!image) {
    throw new CUstomError(404, 'No image found');
  }
  return res.json({ image });
});

exports.sendPrompt = asyncHandler(async (req, res) => {
  const workflow = await comfyuiHelper.getWorkflow(req.body);
  const data = await comfyuiService.postPrompt(workflow);
  res.json(data);
});

exports.getServerStatus = asyncHandler(async (req, res) => {
  const { status } = await comfyuiService.getServerStatus();
  res.json({ status });
});

exports.startServer = asyncHandler(async (req, res) => {
  const { status } = await comfyuiService.startServer();
  res.json({ status });
});

exports.stopServer = asyncHandler(async (req, res) => {
  const { status } = await comfyuiService.stopServer();
  res.json({ status });
});
