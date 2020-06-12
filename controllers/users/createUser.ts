import { RouterContext } from 'https://deno.land/x/oak/mod.ts'
import { usersCollection } from '../../database.ts'

const createUser = async( ctx: RouterContext ) => {
    const { value: { username } } = await ctx.request.body()
    const newUser: any = {
        username,
        dateCreated: new Date(),
        dateUpdated: new Date()
    }
    const userID = await usersCollection.insertOne(newUser)
    console.log(userID)

    ctx.response.status = 201
    ctx.response.body = newUser
}

export { createUser }
