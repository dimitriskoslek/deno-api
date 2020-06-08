import { Context } from 'https://deno.land/x/oak/mod.ts'

const auth = ( ctx: Context ) => {
    ctx.response.body = 'Authentication successfully'
}

export { auth }
