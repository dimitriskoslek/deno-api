import type { RouterContext } from 'https://deno.land/x/oak@v6.2.0/mod.ts'
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";
import { usersCollection } from '../../database.ts'

const register = async ( ctx: RouterContext ) => {

    /*NEW*/
    const result = ctx.request.body()
    const value = await result.value
    /*OLD*/
    //const { value } = await ctx.request.body()



    // the !.username syntax puts TS at ease, in case value is null/undefined
    const username = value!.username

    const existingUser = await usersCollection.findOne({ username: username })

    // If exists, deny registration
    if(existingUser){
        ctx.response.status = 304
        ctx.response.body = { msg: "The username is taken." }
        return
    }

    // Get the password an1d hash it
    // the !.username syntax puts TS at ease, in case value is null/undefined
    const password = value!.password
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
