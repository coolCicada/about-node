// example/controller/user/getinfo.ts
export default {
  method: 'GET',
  handler: async (ctx) => {
    ctx.body = 'my name is liujianghong';
  }
}