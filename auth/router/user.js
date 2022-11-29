const router = require('koa-router')({ prefix: '/user' });
const res = require('../utils/ownRes');
const { getUser } = require('../api/login');

const getUserM = async (ctx) => {
  const { authorization } = ctx.request.header;

  const { error, data } = await getUser(authorization + '1');
  
  if (!error && data) {
    ctx.body = res.success(data);
  } else {
    ctx.status = 401;
  }
}

router.get('/info', getUserM);

module.exports = router;