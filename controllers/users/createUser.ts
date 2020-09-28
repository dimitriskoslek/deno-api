import type { RouterContext } from 'https://deno.land/x/oak@v6.2.0/mod.ts'
import { usersCollection } from '../../database.ts'

const createUser = async( ctx: RouterContext ) => {

    /*NEW*/
    const result = ctx.request.body()
    const value = await result.value
    const username = value.username
    /*OLD*/
    //const { value: { username } } = await ctx.request.body()

    const newUser: any = {
        username: username,
        dateCreated: new Date(),
        dateUpdated: new Date()
    }
    const userID = await usersCollection.insertOne(newUser)

    ctx.response.status = 201
    ctx.response.body = newUser
}

export { createUser }
