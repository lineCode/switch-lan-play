import { Middleware, Context } from 'koa'

const ProtocolName = 'slpserver'

export class SLPServer {
  upgrade (): Middleware {
    return this.middleware.bind(this)
  }
  protected async middleware (ctx: Context, next: () => Promise<any>) {
    const upgrade = ctx.headers['upgrade']
    if (upgrade === ProtocolName) {
      ctx.status = 101
      ctx.message = 'Switching Protocols'
      ctx.res.setHeader('Connection', 'Upgrade')
      ctx.res.setHeader('Upgrade', ProtocolName)
    } else {
      ctx.status = 426
      ctx.message = 'Upgrade Required'
      ctx.res.setHeader('Upgrade', ProtocolName)
      ctx.body = 'Upgrade Required'
    }
  }
}
