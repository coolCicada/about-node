const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors');

app.use(cors());

const oauthRouter = require('./router/index');
const userRouter = require('./router/user');
app.use(oauthRouter.routes());
app.use(userRouter.routes());

const port = 3000;
app.listen(port, () => {
  console.log(`started at ${3000}`);
});