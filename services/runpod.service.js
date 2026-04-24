const runpodApi = require('../config/runpodApi');

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
