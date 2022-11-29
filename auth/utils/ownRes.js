function error(error) {
  return {
    error,
    data: null,
  };
}

function success(data) {
  return {
    error: null,
    data,
  };
}

module.exports = {
  error,
  success,
};