import { RouterContext } from 'https://deno.land/x/oak/mod.ts';
import { usersCollection } from '../../database.ts'

const getUser = async( ctx: RouterContext ) => {
    const username = ctx.params.username
    const user = await usersCollection.findOne({
        username: username
    })
    ctx.response.body = user
}

export { getUser }
