const axios = require('axios');

const runpodApi = axios.create({
  baseURL: process.env.RUNPOD_BASE_URL,
  headers: { Authorization: `Bearer ${process.env.RUNPOD_API_KEY}` },
});

const graphqlApi = axios.create({
  baseURL: 'https://api.runpod.io',
  headers: { Authorization: `Bearer ${process.env.RUNPOD_API_KEY}` },
});

module.exports = { runpodApi, graphqlApi };
