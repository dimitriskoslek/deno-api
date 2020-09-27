import type { RouterContext } from 'https://deno.land/x/oak@v6.2.0/mod.ts'

const guest = ( ctx: RouterContext ) => {
    ctx.response.body = 'Welcome! You are logged in as a guest.'
}

export { guest }
