import { Context } from 'https://deno.land/x/oak/mod.ts'
import { serve } from "https://deno.land/std/http/server.ts"
import { makeJwt, setExpiration, Jose, Payload } from "https://deno.land/x/djwt/create.ts"
import { validateJwt } from "https://deno.land/x/djwt/validate.ts"
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { usersCollection } from '../../database.ts'

const key = "Y61Y;SmM[]LIF-rp"
const header: Jose = {
  alg: "HS256",
  typ: "JWT",
}

const login = async ( ctx: Context ) => {
    const { value: { username, password }} = await ctx.request.body()

    // first find the username
    const foundUser = await usersCollection.findOne({ username: username })

    // If username not found, return
    if(!foundUser){
        console.log('username wrong')
        ctx.response.status = 422
        ctx.response.body = { msg: 'The combination of username and password was incorrect.' }
        return
    }
    // compare password given with users stored and hashed password
    const passCompare = bcrypt.compare(password, foundUser.password)
    console.log(passCompare)

    if(!passCompare){
        console.log('password wrong')
        ctx.response.status = 422
        ctx.response.body = { msg: 'The combination of username and password was incorrect.' }
        return
    }

    const payload: Payload = {
        iss: foundUser.username,
        exp: setExpiration(new Date().getTime() + 60000 * 60 * 24 * 7),
    }
    const jwt = makeJwt({ key, header, payload })

    if(jwt){
        ctx.response.status = 200
        ctx.response.body = {
            username: foundUser.username,
            jwt
        }
    } else {
        ctx.response.status = 500
        ctx.response.body = { msg: "Internal Server Error." }
    }
}

export { login }
