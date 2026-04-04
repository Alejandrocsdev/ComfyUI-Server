const api = require('../../config/api');

const { system } = require('../../utils');

exports.getHistory = async (promptId) => {
  const { data } = await api.get(`/history/${promptId}`);
  return data;
};

exports.postPrompt = async (prompt) => {
  const { data } = await api.post('/prompt', { prompt });
  return data;
};

exports.getServerStatus = async () => {
  const result = await system.execAsync('systemctl show comfyui --property=ActiveState --value');
  return { status: result.trim() };
};

exports.startServer = async () => {
  await system.execAsync('sudo systemctl start comfyui');
  return { status: 'started' };
};

exports.stopServer = async () => {
  await system.execAsync('sudo systemctl stop comfyui');
  return { status: 'stopped' };
};
