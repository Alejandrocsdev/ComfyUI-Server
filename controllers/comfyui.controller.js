const comfyuiService = require('../services/comfyui.service');

const { asyncHandler } = require('../middlewares');

exports.getPrompt = asyncHandler(async (req, res) => {
  const { promptId } = req.params;
  const data = await comfyuiService.getHistory(promptId);
	res.json({ message: 'Prompt retrieved successfully', data });
});

exports.sendPrompt = asyncHandler(async (req, res) => {
  const data = await comfyuiService.postPrompt(req.body);
  res.json({ message: 'Prompt sent successfully', data });
});

exports.getServerStatus = asyncHandler(async (req, res) => {
  const { status } = await comfyuiService.getServerStatus();
  res.json({ message: `ComfyUI server status: ${status}` });
});

exports.startServer = asyncHandler(async (req, res) => {
  const { status } = await comfyuiService.startServer();
  res.json({ message: `ComfyUI ${status} successfully` });
});

exports.restartServer = asyncHandler(async (req, res) => {
  const { status } = await comfyuiService.restartServer();
  res.json({ message: `ComfyUI ${status} successfully` });
});

exports.stopServer = asyncHandler(async (req, res) => {
  const { status } = await comfyuiService.stopServer();
  res.json({ message: `ComfyUI ${status} successfully` });
});
