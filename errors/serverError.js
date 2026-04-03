const serverError = (error) => {
  switch (error.code) {
    case 'EADDRINUSE':
      console.error('[Server] port already in use');
      break;

    default:
      console.error('[Server] Failed to start\n');
			console.error(error);
  }

  process.exit(1);
};

module.exports = serverError;
