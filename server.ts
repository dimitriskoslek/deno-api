//import { exec } from 'https://deno.land/x/execute/mod.ts'

// Environment settings
const env = Deno.env.toObject()
const SERVER_PORT = env.SERVER_PORT || 4000
const SERVER_HOST = env.SERVER_HOST || '127.0.0.1'

import { application } from './application.ts'

//const result1 = await exec('deno -V')
//console.log(result1)
// --> deno 1.0.0

//const result2 = await exec(['which', 'deno'])
//console.log(result2)
// --> /usr/local/bin/deno

// Listen
console.log(`Listening on ${SERVER_HOST}:${SERVER_PORT}`)
await application.listen(`${SERVER_HOST}:${SERVER_PORT}`)
