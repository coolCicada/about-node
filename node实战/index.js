const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const session = require('koa-session');

const sessionConfig = {
  key: 'koa:sess',
  maxAge: 86400000,
  signed: false,
};

app.use(session(sessionConfig, app));
app.use(static('static'));
app.use(bodyParser());

const router = new Router();
router.get('/api/get/userInfo', async (ctx) => {
  const { name } = ctx.request.query;
  ctx.body = `200: get, name: ${name}`;
});
router.get('/api/update/userInfo', async (ctx) => {
  ctx.body = '200: update';
});
router.post('/api/post/userInfo', async (ctx) => {
  let { name } = ctx.request.body;
  ctx.body = `param name: ${name}`;
});
router.get('/setCookie', async (ctx) => {
  ctx.cookies.set(
    'id',
    '123456',
    {
      domain: 'localhost',
      expires: new Date('2023-02-23'),
      httpOnly: false,
      overwrite: false
    }
  );
  ctx.body = '设置成功';
});
router.get('/getCookie', async (ctx) => {
  const cookie = ctx.cookies.get('id');
  console.log(cookie);
  ctx.body = `cookie为：${cookie}`;
});
router.post('/login', async (ctx) => {
  const postData = ctx.request.body;
  if (ctx.session.usr) {
    ctx.body = `huanying, ${ctx.session.usr}`;
  } else {
    ctx.session = postData;
    ctx.body = 'first';
  }
});

app.use(router.routes()).use(async (ctx) => {
  ctx.body = '404: no matched';
});

const PORT = 4000;
app.listen(4000, () => {
  console.log(`server is running at ${PORT}`);
});