import { RouterContext } from 'https://deno.land/x/oak/mod.ts'
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { usersCollection } from '../../database.ts'

const register = async ( ctx: RouterContext ) => {
    const { value } = await ctx.request.body()
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
        username,
        hashedPassword,
        dateCreated: new Date(),
        dateUpdated: new Date()
    }
    const userID = await usersCollection.insertOne(newUser)

    // Response
    ctx.response.status = 201
    ctx.response.body = { msg: "You have been registered successfully" }
}

export { register }
