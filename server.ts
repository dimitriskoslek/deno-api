// Environment settings
const env = Deno.env.toObject()
const SERVER_PORT = env.SERVER_PORT || 4000
const SERVER_HOST = env.SERVER_HOST || '127.0.0.1'

import { application } from './application.ts'

// Listen
console.log(`Listening on ${SERVER_HOST}:${SERVER_PORT}`)
await application.listen(`${SERVER_HOST}:${SERVER_PORT}`)
