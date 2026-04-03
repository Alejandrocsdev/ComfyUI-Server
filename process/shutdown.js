const process = require('process');

let registered = false;

const shutdownHandlers = (server) => {
  if (registered) return;
  registered = true;

  if (!server || typeof server.close !== 'function') {
    throw new Error('shutdownHandlers requires an HTTP server instance');
  }

  const shutdown = (signal) => {
    console.info(`Received ${signal}. Shutting down gracefully...`);

    server.close(() => {
      console.info('HTTP server closed');
      process.exit(0);
    });

    setTimeout(() => {
      console.error('Force shutdown');
      process.exit(1);
    }, 10000);
  };

	// Interrupt (Ctrl + C)
  process.on('SIGTERM', shutdown);
	// Terminate (ps aux | grep node => kill <pid>)
  process.on('SIGINT', shutdown);
};

module.exports = shutdownHandlers;

// ==============
// Shutdown flow:
// ==============
// Stop accepting new connections
// ↓
// Allow existing connections to finish
// ↓
// Wait up to 10 seconds
// ↓
// Force exit even if sockets are still open