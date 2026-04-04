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
  const command = 'systemctl show comfyui --property=ActiveState --value';
  const result = await system.execAsync(command);
  return result.trim();
};

exports.getServerLog = async (lines = 100) => {
  const command = `journalctl -u comfyui -n ${lines} --no-pager`;
  const result = await system.execAsync(command);
  return result;
};

exports.startServer = async () => {
  await system.execAsync('sudo systemctl start comfyui');
  return 'started';
};

exports.stopServer = async () => {
  await system.execAsync('sudo systemctl stop comfyui');
  return 'stopped';
};
