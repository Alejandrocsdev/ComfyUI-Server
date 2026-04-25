const axios = require('axios');
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
    query: 'query getMyself { myself { clientBalance } }',
    variables: {},
  });
  return data;
};
