const runpodService = require('../services/runpod/service');
const { broadcast } = require('../sse');

// Persist reachability across ticks so we stop pinging once a service is up.
// Reset when pod ID changes (new pod created or pod terminated).
let stickyReachability = { comfyui: false, jupyter: false };
let lastPodId = null;

const poll = async () => {
  try {
    const pods = await runpodService.getPods();
    const podId = pods.length === 1 ? pods[0].id : null;

    if (podId !== lastPodId) {
      stickyReachability = { comfyui: false, jupyter: false };
      lastPodId = podId;
    }

    let reachability = { comfyui: false, jupyter: false };

    if (podId) {
      const [comfyui, jupyter] = await Promise.all([
        stickyReachability.comfyui ? Promise.resolve(true) : runpodService.pingPod(podId, 8188),
        stickyReachability.jupyter ? Promise.resolve(true) : runpodService.pingPod(podId, 8888),
      ]);
      stickyReachability = { comfyui, jupyter };
      reachability = { comfyui, jupyter };
    }

    broadcast({ pods, reachability });
  } catch {
    // swallow — next tick will retry
  }
};

const startPoller = () => {
  poll();
  return setInterval(poll, 10000);
};

module.exports = { startPoller };
