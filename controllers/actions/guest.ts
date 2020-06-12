import { RouterContext } from 'https://deno.land/x/oak/mod.ts'

const guest = ( ctx: RouterContext ) => {
    ctx.response.body = 'Welcome! You are logged in as a guest.'
}

export { guest }
