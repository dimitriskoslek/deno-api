import { MongoClient } from "https://deno.land/x/mongo@v0.8.0/mod.ts"

const env = Deno.env.toObject()
const MONGO_HOST = env.MONGO_HOST || '127.0.0.1'
const MONGO_PORT = env.MONGO_PORT || 27017
const MONGO_DB_NAME = env.MONGO_DB_NAME || 'exodus'

const client = new MongoClient()
client.connectWithUri('mongodb://' + MONGO_HOST + ':' + MONGO_PORT)

// Access to db
const db = client.database(MONGO_DB_NAME)

// Access to db collections
const usersCollection = db.collection('users')

export { db, usersCollection }
