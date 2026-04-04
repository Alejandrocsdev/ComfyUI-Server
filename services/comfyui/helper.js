const CUstomError = require('../../errors/CustomError');

const workflowTemplate = require('../../config/comfyui/prompt.json');

exports.getImage = async (data, promptId) => {
  const job = data?.[promptId];

  if (!job || !job.outputs) {
    return null;
  }

  const { outputs } = job;

  let image = null;

  for (const nodeId in outputs) {
    const nodeOutput = outputs[nodeId];
    if (nodeOutput.images && nodeOutput.images.length > 0) {
      image = nodeOutput.images[0];
      break;
    }
  }

  if (!image) {
    throw new CUstomError(404, 'No image found');
  }

  const { filename, subfolder, type } = image;
  return `${process.env.BASE_URL}/view?filename=${filename}&subfolder=${subfolder}&type=${type}`;
};

exports.getWorkflow = async ({ prompt, resolution, sampler, output }) => {
  const findNodeByClass = (workflow, classType) => {
    return Object.values(workflow).find(
      (node) => node.class_type === classType,
    );
  };

  // Deep clone
  const workflow = JSON.parse(JSON.stringify(workflowTemplate));

  // =========================
  // 1. GET KSampler NODE
  // =========================
  const samplerNode = findNodeByClass(workflow, 'KSampler');

  if (!samplerNode) {
    throw new Error('KSampler node not found');
  }

  // =========================
  // 2. FIND CONNECTED NODES
  // =========================
  const positiveNodeId = samplerNode.inputs.positive?.[0];
  const negativeNodeId = samplerNode.inputs.negative?.[0];

  const positiveNode = workflow[positiveNodeId];
  const negativeNode = workflow[negativeNodeId];

  // =========================
  // 3. SET PROMPTS
  // =========================
  if (positiveNode) {
    positiveNode.inputs.text = prompt?.positive;
  }

  if (negativeNode) {
    negativeNode.inputs.text = prompt?.negative;
  }

  // =========================
  // 4. RESOLUTION
  // =========================
  const latentNodeId = samplerNode.inputs.latent_image?.[0];
  const latentNode = workflow[latentNodeId];

  if (latentNode) {
    latentNode.inputs.width = Number(resolution?.width);
    latentNode.inputs.height = Number(resolution?.height);
  }

  // =========================
  // 5. SAMPLER SETTINGS
  // =========================
  samplerNode.inputs.seed = Number(sampler?.seed);
  samplerNode.inputs.steps = Number(sampler?.steps);
  samplerNode.inputs.cfg = Number(sampler?.cfg);
  samplerNode.inputs.denoise = Number(sampler?.denoise);
  samplerNode.inputs.sampler_name = sampler?.name;
  samplerNode.inputs.scheduler = sampler?.scheduler;

  // =========================
  // 6. OUTPUT NODE
  // =========================
  const saveImageNode = findNodeByClass(workflow, 'SaveImage');

  if (saveImageNode) {
    const cleanOutput = (output || '').replace(/^\/+/, '');
    const prefix = cleanOutput ? `${cleanOutput}/ComfyUI` : 'ComfyUI';
    saveImageNode.inputs.filename_prefix = prefix;
  }

  return workflow;
};
