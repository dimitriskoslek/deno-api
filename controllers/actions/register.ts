import type { RouterContext } from 'https://deno.land/x/oak@v6.2.0/mod.ts'
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";
import { usersCollection } from '../../database.ts'

const register = async ( ctx: RouterContext ) => {
    console.log('Somebody is trying to sign up')

    /*NEW*/
    const result = ctx.request.body()
    var value = await result.value

    // If we dont receive and 'application/json' we must parse the text data
    if(ctx.request.headers.get('Content-Type') == 'text/plain;charset=UTF-8'){
        value = JSON.parse(value)
    }

    const username = value.username

    const existingUser = await usersCollection.findOne({ username: username })

    // If exists, deny registration
    if(existingUser){
        ctx.response.status = 304
        ctx.response.body = { msg: "The username is taken." }
        return
    }

    // Get the password and hash it
    const password = value.password
    const salt = await bcrypt.genSalt(8)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create the user object to store in the db
    const newUser: any = {
        username: username,
        hashedPassword: hashedPassword,
        dateCreated: new Date(),
        dateUpdated: new Date()
    }
    const userID = await usersCollection.insertOne(newUser)

    // Response
    ctx.response.status = 201
    ctx.response.body = { msg: "You have been registered successfully" }
}

export { register }
