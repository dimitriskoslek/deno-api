import type { RouterContext } from 'https://deno.land/x/oak@v6.2.0/mod.ts'
import { usersCollection } from '../../database.ts'

const updateUser = async( ctx: RouterContext ) => {

    // get url param on which user to update
    const uname = ctx.params.username

    // get user input on the changed info
    /*NEW*/
    const result = ctx.request.body()
    const value = await result.value
    const username = value.username
    const password = value.password
    /*OLD*/
    //const { value: { username, password }} = await ctx.request.body()

    // Create the updated user object
    const updatedUser = {
        username: username,
        password: password,
        dateUpdated: new Date()
    }
    // run the update and grab the result. See mongo_deno docs
    const { modifiedCount } = await usersCollection.updateOne({ username: uname }, { $set: updatedUser })

    if(!modifiedCount){
        ctx.response.status = 404
        ctx.response.body = { msg: "User does not exist."}
        return
    }
    // log the now updated user
    ctx.response.body = await usersCollection.findOne({ username: username })
}

export { updateUser }
