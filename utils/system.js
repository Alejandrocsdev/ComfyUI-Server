const { exec } = require('child_process');

const execAsync = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) return reject(stderr || error.message);
      resolve(stdout);
    });
  });
}

const system = { execAsync };

module.exports = system;
