import type { RouterContext } from 'https://deno.land/x/oak@v6.2.0/mod.ts'
import { usersCollection } from '../../database.ts'

const deleteUser = async( ctx: RouterContext ) => {
    const uname = ctx.params.username
    const deletedCount = await usersCollection.deleteOne({ username: uname })

    if(!deletedCount){
        ctx.response.status = 404
        ctx.response.body = { msg: "User does not exist." }
        return
    }
    ctx.response.status = 204
}

export { deleteUser }
