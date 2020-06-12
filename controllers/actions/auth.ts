import { RouterContext } from 'https://deno.land/x/oak/mod.ts'

const auth = ( ctx: RouterContext ) => {
    ctx.response.body = 'Authentication successfully'
}

export { auth }
