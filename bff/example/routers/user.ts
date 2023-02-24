// example/routers/user.ts
import Router from 'koa-router';
const router = new Router()
router.prefix('/user')
router.get('/getinfo', (ctx, next)=>{
  ctx.body = "my name is ls"
})
export default router;