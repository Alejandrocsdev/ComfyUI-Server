// Environment Variables
const { NODE_ENV, CLIENT_URL, CLIENT_PORT } = process.env;

const isProduction = NODE_ENV === 'production';

const client = isProduction ? CLIENT_URL : `http://localhost:${CLIENT_PORT}`;

const url = { client };

module.exports = url;
