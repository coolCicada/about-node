const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const session = require('koa-session');
const Store = require('./store');
const shortid = require('shortid');

const redisConfig = {
  redis: {
    port: 6379,
    host: '47.93.223.215',
    db: 0,
    password: '',
  }
};
const redisCli = new Store(redisConfig);
const sessionConfig = {
  key: 'koa:sess',
  maxAge: 86400000,
  signed: false,
  store: new Store(redisConfig),
  genid: () => shortid.generate(),
}

app.use(session(sessionConfig, app));
app.use(static('static'));
app.use(bodyParser());

const glob = require('glob');
const path = require('path');
const basePath = path.resolve(__dirname, './actions');
const filesList = glob.sync(path.resolve(__dirname, './actions', '**/*.js'));
let routerMap = {};
filesList.forEach(item => {
  const { method, handler } = require(item);
  const relative = path.relative(basePath, item);
  const extname = path.extname(item);
  const fileRouter = '/' + relative.split(extname)[0];
  const key = '_' + method + '_' + fileRouter;
  routerMap[key] = handler;
});

app.use(async (ctx, next) => {
  const { path, method } = ctx;
  const key = '_' + method + '_' + path;
  if (routerMap[key]) {
    routerMap[key](ctx);
  } else {
    ctx.body = 'no this router';
  }
})

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
router.get('/redis/set/:key/:value', async (ctx) => {
  const r = await redisCli.set(ctx.params.key, ctx.params.value, 5000);
  ctx.body = r;
});
router.get('/redis/get/:key', async (ctx) => {
  const r = await redisCli.get(ctx.params.key);
  ctx.body = r;
})

app.use(router.routes()).use(async (ctx) => {
  ctx.body = '404: no matched';
});

const PORT = 4000;
app.listen(4000, () => {
  console.log(`server is running at ${PORT}`);
});