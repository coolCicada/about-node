const { sign } = require('jsonwebtoken');
const secret = 'my_secret';

module.exports = {
  method: 'POST',
  handler: (ctx) => {
    const { userName } = ctx.request.body;
    if (userName) {
      const token = sign({ userName }, secret, {
        expiresIn: '1h'
      });
      ctx.body = {
        message: 'get token success!',
        code: 1,
        token
      }
    } else {
      ctx.body = {
        message: 'param error',
        code: -1
      }
    }
  }
}