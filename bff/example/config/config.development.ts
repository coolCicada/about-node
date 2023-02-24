export default app => {
  return {
    devServer: {
      port: 8888
    },
    // router: 'file'
    router: 'koa-router'
  }
}