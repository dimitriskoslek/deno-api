import { Context } from 'https://deno.land/x/oak/mod.ts'

const guest = ( ctx: Context ) => {
    ctx.response.body = 'Logged in as a guest.'
}

export { guest }
