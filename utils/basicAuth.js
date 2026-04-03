const basicAuth = (username, password) => {
  const credentials = `${username}:${password}`;
  return Buffer.from(credentials).toString('base64');
};

module.exports = basicAuth;
