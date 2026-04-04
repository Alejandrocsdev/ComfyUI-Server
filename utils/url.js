// Environment Variables
const { NODE_ENV, CLIENT_PRO_URL, CLIENT_DEV_URL } = process.env;

const isProduction = NODE_ENV === 'production';

const client = isProduction ? CLIENT_PRO_URL : CLIENT_DEV_URL;

const url = { client };

module.exports = url;
