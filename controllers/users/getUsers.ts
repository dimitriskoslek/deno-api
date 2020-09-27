import type { RouterContext } from 'https://deno.land/x/oak@v6.2.0/mod.ts';
import { usersCollection } from '../../database.ts'

const getUsers = async( ctx: RouterContext ) => {
    const users = await usersCollection.find()
    ctx.response.body = users
    ctx.response.headers.set("Access-Control-Allow-Origin", "*")
}

export { getUsers }
