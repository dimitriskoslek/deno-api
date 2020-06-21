import { RouterContext } from 'https://deno.land/x/oak/mod.ts';

const welcomeMessage = async ( ctx: RouterContext ) => {
    ctx.response.status = 200
    ctx.response.body = 'Welcome!'
}

export { welcomeMessage }
