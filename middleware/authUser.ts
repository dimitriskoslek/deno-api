import type { RouterContext } from 'https://deno.land/x/oak@v6.2.0/mod.ts';
import { validateJwt } from "https://deno.land/x/djwt@v1.6/validate.ts"

const key = "Y61Y;SmM[]LIF-rp"

const authMiddleware = async (ctx: RouterContext, next: any ) => {
    const headers: Headers = ctx.request.headers
    const authorization = headers.get('Authorization')
    if(!authorization){
        ctx.response.status = 401
        return
    }
    const jwt = authorization.split(' ')[1]
    if(!jwt){
        ctx.response.status = 401
        return
    }
    const validatedJwt = await validateJwt({
        jwt: jwt,
        key: key,
        //isThrowing: false,
        algorithm: ["HS256", "HS512"],
    })
    if(!validatedJwt.isValid){
        await next()
        return
    }
    ctx.response.status = 401
    ctx.response.body = { msg: "Invalid JWT token."}
}

export { authMiddleware }
