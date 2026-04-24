const axios = require('axios');

const comfyuiApi = axios.create({
  baseURL: process.env.BASE_URL,
});

module.exports = comfyuiApi;
