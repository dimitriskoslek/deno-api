import { MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts"

const client = new MongoClient()
client.connectWithUri('mongodb://localhost:27017')

// Access to db
const db = client.database('exodus')

// Access to db collections
const usersCollection = db.collection('users')

export { db, usersCollection }
