const axios = require('axios');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { Client: SSHClient } = require('ssh2');
const { runpodApi, graphqlApi } = require('../../config/api/runpodApi');

const POD_BODY = {
  name: 'ComfyUI-5090',
  cloudType: 'SECURE',
  computeType: 'GPU',
  gpuTypeIds: ['NVIDIA GeForce RTX 5090'],
  gpuCount: 1,
  dataCenterPriority: 'availability',
  containerDiskInGb: 30,
  volumeMountPath: '/workspace',
  volumeInGb: 0,
  interruptible: false,
  globalNetworking: false,
};

exports.getPods = async () => {
  const { data } = await runpodApi.get('/v1/pods');
  return data;
};

exports.getPod = async (podId) => {
  const { data } = await runpodApi.get(`/v1/pods/${podId}`);
  return data;
};

exports.createPod = async () => {
  const body = {
    ...POD_BODY,
    dataCenterIds: [process.env.RUNPOD_REGION],
    templateId: process.env.RUNPOD_TEMPLATE_ID,
    networkVolumeId: process.env.RUNPOD_VOLUME_ID,
  };
  const { data } = await runpodApi.post('/v1/pods', body);
  return data;
};

exports.terminatePod = async (podId) => {
  const { data } = await runpodApi.delete(`/v1/pods/${podId}`);
  return data;
};

exports.pingPod = async (podId, port) => {
  try {
    const url = `https://${podId}-${port}.proxy.runpod.net`;
    const response = await axios.get(url, { timeout: 5000 });
    return response.status === 200;
  } catch {
    return false;
  }
};

exports.getBalance = async () => {
  const { data } = await graphqlApi.post('/graphql?operation=getMyself', {
    query: 'query { myself { clientBalance } }',
    variables: {},
  });
  return data;
};

const POLL_INTERVAL = 3000;
const POLL_MAX = 20;

exports.getSSHPort = async () => {
  for (let attempt = 0; attempt < POLL_MAX; attempt++) {
    const { data } = await graphqlApi.post('/graphql?operation=getMyself', {
      query: 'query { myself { pods { id runtime { ports { ip publicPort privatePort type } } } } }',
      variables: {},
    });

    const pods = data?.data?.myself?.pods ?? [];
    for (const pod of pods) {
      const port = (pod?.runtime?.ports ?? []).find(
        (p) => p.privatePort === 22 && p.type === 'tcp'
      );
      if (port) return { ip: port.ip, publicPort: port.publicPort };
    }

    if (attempt < POLL_MAX - 1) {
      await new Promise((r) => setTimeout(r, POLL_INTERVAL));
    }
  }
  throw new Error('SSH port not available — pod may still be starting');
};

exports.execSSH = async (command) => {
  const { ip, publicPort } = await exports.getSSHPort();
  const privateKey = fs.readFileSync(path.join(os.homedir(), '.ssh', 'id_ed25519'));

  return new Promise((resolve, reject) => {
    const conn = new SSHClient();
    let stdout = '';
    let stderr = '';

    conn.on('ready', () => {
      conn.exec(command, (err, stream) => {
        if (err) { conn.end(); return reject(err); }
        stream.on('close', (code) => {
          conn.end();
          resolve({ code, stdout, stderr });
        });
        stream.on('data', (data) => { stdout += data.toString(); });
        stream.stderr.on('data', (data) => { stderr += data.toString(); });
      });
    })
    .on('error', reject)
    .connect({ host: ip, port: publicPort, username: 'root', privateKey });
  });
};
