const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const session = require('koa-session');
const Store = require('./store');
const shortid = require('shortid');
const router = require('koa-router')();

const redisConfig = {
  redis: {
    port: 6379,
    host: '47.93.223.215',
    db: 0,
    password: '',
  }
};
const sessionConfig = {
  key: 'koa:sess',
  maxAge: 86400000,
  signed: false,
  store: new Store(redisConfig),
  genid: () => shortid.generate(),
}
const secret = 'my_secret';
const jwt = require('koa-jwt')({ secret });

router.get('/welcome', jwt, async (ctx, next) => {
  ctx.body = { message: 'welcome!!!' };
});

app.use(router.routes());

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

const PORT = 4000;
app.listen(4000, () => {
  console.log(`server is running at ${PORT}`);
});