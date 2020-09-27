import type { RouterContext } from 'https://deno.land/x/oak@v6.2.0/mod.ts';

const welcomeMessage = async ( ctx: RouterContext ) => {
    ctx.response.status = 200
    ctx.response.body = 'Welcome!'
}

export { welcomeMessage }
