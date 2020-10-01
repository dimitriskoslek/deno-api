import type { RouterContext } from 'https://deno.land/x/oak@v6.2.0/mod.ts'
import { usersCollection } from '../../database.ts'
import { serve } from "https://deno.land/std@0.71.0/http/server.ts"
import { makeJwt, setExpiration } from "https://deno.land/x/djwt@v1.6/create.ts"
import type { Jose, Payload } from "https://deno.land/x/djwt@v1.6/create.ts"
import { validateJwt } from "https://deno.land/x/djwt@v1.6/validate.ts"
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts"

const env = Deno.env.toObject()
const key = env.JWT_KEY
const header: Jose = {
  alg: "HS256",
  typ: "JWT",
}

const login = async ( ctx: RouterContext ) => {

    console.log('0')
    const result = ctx.request.body()
    var value = await result.value
    if(ctx.request.headers.get('Content-Type') == 'text/plain;charset=UTF-8'){
        value = JSON.parse(value)
    }
    const username = value.username
    const password = value.password
    console.log('1')

    // first find the username
    const foundUser = await usersCollection.findOne({
        username: username
    })
    console.log('2')

    // If username not found, return
    if(!foundUser){
        console.log('username wrong')
        ctx.response.status = 422
        ctx.response.body = { msg: 'The combination of username and password was incorrect.' }
        return
    }
    console.log('3')

    // compare password given with users stored and hashed password
    const passCompare = await bcrypt.compare(password, (foundUser as any).hashedPassword)
    console.log('4')

    if(!passCompare){
        console.log('password wrong')
        ctx.response.status = 422
        ctx.response.body = { msg: 'The combination of username and password was incorrect.' }
        return
    }
    console.log('5')
    const payload: Payload = {
        iss: (foundUser as any).username,
        exp: setExpiration(new Date().getTime() + 60000 * 60 * 24 * 7),
    }
    const jwt = await makeJwt({ key, header, payload })
    console.log('6')
    if(jwt){
        console.log('7a')
        ctx.response.status = 200
        ctx.response.body = {
            username: username,
            jwt: jwt
        }
    } else {
        console.log('7b')
        ctx.response.status = 500
        ctx.response.body = { msg: "Internal Server Error." }
        ctx.response.headers.set('Access-Control-Allow-Origin', '*')
    }
}

export { login }
