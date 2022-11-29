const router = require('koa-router')({ prefix: '/oauth' });
const { getAccessToken } = require('../api/login');
const res = require('../utils/ownRes');

const oauth = async ctx => {
  const client_id = '3a20081d791afdf2f4de';
  const client_secret = '65699a9d305c94499e3530a581f21622aee5bdb3';
  const code = ctx.request.query.code;

  const data = await getAccessToken(
    {
      client_id,
      client_secret,
      code
    }
  );

  const { error, access_token } = data;

  if (!error && access_token) {
    ctx.body = res.success(access_token);
  } else {
    ctx.body = res.error(error);
  }
}

router.get('/redirect', oauth);

module.exports = router;