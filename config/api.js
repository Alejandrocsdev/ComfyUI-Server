const axios = require('axios');

// const basicAuth = require('../../utils');

// const credentials = basicAuth(process.env.USERNAME, process.env.PASSWORD);

const api = axios.create({
  baseURL: process.env.BASE_URL,
  // headers: { Authorization: `Basic ${credentials}` },
  // headers: { Authorization: `Bearer ${process.env.TOKEN}` },
});

// Request Interceptor
api.interceptors.request.use(
  (request) => {
		// Handle request
    return request;
  },
  (error) => {
		// Handle request error
    return error;
  },
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
		// Handle response
    return response;
  },
  (error) => {
		// Handle response error
    return error;
  },
);

module.exports = api;
