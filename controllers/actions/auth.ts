import type { RouterContext } from 'https://deno.land/x/oak@v6.2.0/mod.ts'

const auth = ( ctx: RouterContext ) => {
    ctx.response.body = 'Authentication successfully'
}

export { auth }
