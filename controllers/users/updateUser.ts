import { RouterContext } from 'https://deno.land/x/oak/mod.ts'
import { usersCollection } from '../../database.ts'

const updateUser = async( ctx: RouterContext ) => {
    const uname = ctx.params.username
    const { value: { username, password } } = await ctx.request.body()
    const updatedUser = {
        username,
        password,
        dateUpdated: new Date()
    }
    const { modifiedCount } = await usersCollection.updateOne({ username: uname }, { $set: updatedUser })

    if(!modifiedCount){
        ctx.response.status = 404
        ctx.response.body = { msg: "User does not exist."}
        return
    }
    ctx.response.body = await usersCollection.findOne({ username: username })
}

export { updateUser }
