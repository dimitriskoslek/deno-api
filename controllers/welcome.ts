import { RouterContext } from 'https://deno.land/x/oak/mod.ts';

const welcomeMessage = ( ctx: RouterContext ) => {
    ctx.response.body = 'Welcome!'
}

export { welcomeMessage }
