const axios = require('axios');

const request = axios.create({});

request.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  if (error.response.status === 401) {
    return {
      error: '401'
    };
  };
  return error;
});

module.exports = request;