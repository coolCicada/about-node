const request = require('./base');

function getAccessToken(params) {
  return request.get(
    'https://github.com/login/oauth/access_token',
    {
      params,
      headers: {
        accept: 'application/json'
      }
    });
}

function getUser(authorization) {
  return request.get(
    'https://api.github.com/user',
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${authorization}`
      }
    }
  );
}

module.exports = {
  getAccessToken,
  getUser,
};