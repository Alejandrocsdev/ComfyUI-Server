require('dotenv').config({ quiet: true });

// Crash handlers (FAIL FAST)
require('./process').crashHandlers();

const express = require('express');
const port = Number(process.env.PORT) || 3000;

const { connectMysql } = require('./config/db');

const { cors, notFound, errorHandler } = require('./middlewares');

const serverError = require('./errors/serverError');

const routes = require('./routes');
const { startPoller } = require('./services/runpod/poller');

const start = async () => {
  // 1. Connect databases
  // await connectMysql();

  // 2. Create express instance
  const app = express();

  // Middlewares
	app.use(cors);
  app.use(express.json());

  // Routes
  app.get('/', (req, res) => res.json({ status: 'ok' }));
  app.use('/api', routes);

  // Request error handling
  app.use(notFound);
  app.use(errorHandler);

  // 3. Start RunPod poller (feeds SSE stream)
  startPoller();

  // 4. Start server
  const server = app.listen(port, () => {
    console.info('[Server] listening on port', port);
  });

	// Server error handling
  server.on('error', serverError);

  // Graceful shutdown (CLEAN EXIT)
  require('./process').shutdownHandlers(server);
};

// BOOTSTRAP
start().catch((error) => {
  console.error('[Server] startup aborted\n');
  console.error(error);
  process.exit(1);
});
