const clients = new Set();
let cache = { pods: null, reachability: { comfyui: false, jupyter: false } };

const broadcast = (data) => {
  cache = data;
  const payload = `data: ${JSON.stringify(data)}\n\n`;
  for (const res of clients) {
    res.write(payload);
  }
};

const addClient = (res) => {
  clients.add(res);
  res.write(`data: ${JSON.stringify(cache)}\n\n`);
  return () => clients.delete(res);
};

module.exports = { broadcast, addClient };
