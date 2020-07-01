// Environment settings
const env = Deno.env.toObject()
const SERVER_PORT = env.SERVER_PORT || 4000
const SERVER_HOST = env.SERVER_HOST || '127.0.0.1'

import { application } from './application.ts'

/*************************
**************************
*** START TESTING AREA ***
**************************
*************************/

/* Run bash commands */
import { exec } from 'https://deno.land/x/execute@v1.1.0/mod.ts'
const result1 = await exec('deno -V')
const result2 = await exec(['which', 'deno'])
console.log(result1, result2)

/* Get machine ID */
import { getMachineId } from 'https://deno.land/x/machine_id@v0.3.0/mod.ts'
console.log('My Machine ID: ', await getMachineId())

/* Use moment library */
import { moment } from "https://deno.land/x/moment/moment.ts"
var curDate = new Date()
console.log('Turning' + ' ' + curDate + ' ' + 'into' + ' ' + moment(curDate).format())

/* Trying to send a mail using SMTP */
import { SmtpClient } from "https://deno.land/x/smtp/mod.ts"

const client = new SmtpClient()

/*
// Setup client connect
await client.connect({
  host: "smtp.163.com",
  port: 25,
  username: "username",
  password: "password",
})
*/
/*
// Use TLS
await client.connectTLS({
  host: "smtp.163.com",
  port: 465,
  username: "username",
  password: "password",
})
*/
/*
// Use in gmail
await client.connectTLS({
  host: "smtp.gmail.com",
  port: 465,
  username: "your username",
  password: "your password",
})
*/
/*
// Send an email
await client.send({
  from: "someone@163.com", // Your Email address
  to: "someone@xx.com", // Email address of the destination
  subject: "Mail Title",
  content: "Mail Content，maybe HTML",
})
*/
/*
await client.close()
*/

/* Prompting questions */
import Ask from 'https://deno.land/x/ask/mod.ts';
/*
const ask = new Ask(); // global options are also supported! (see below)

const answers = await ask.prompt([
{
    name: 'name',
    type: 'input',
    message: 'Name:'
},
{
    name: 'age',
    type: 'number',
    message: 'Age:'
}
])

console.log(answers); // { name: "Joe", age: 19 }
*/

/* ASCII table */
import AsciiTable, { AsciiAlign } from 'https://deno.land/x/ascii_table/mod.ts'

// Basic setup
const table1 = new AsciiTable('Title')
table1
    .setHeadingAlign(AsciiAlign.CENTER)
    .setHeading('#', 'Name', 'Age')
    .addRow(1, 'Bob', 52)
    .addRow(2, 'John', 34)
    .addRow(3, 'Jim', 83)
console.log(table1.toString())

// Setting the table up from a JSON
const table2 = AsciiTable.fromJSON({
    title: 'Title',
    heading: [ 'id', 'name' ],
    rows: [
        [1, 'Bob'],
        [1, 'John'],
        [1, 'Jim']
    ]
})
console.log(table2.toString())

// Table without heading is possible
const table3 = new AsciiTable()
table3
    .addRow('a', 'apple', 'Some longer string')
    .addRow('b', 'banana', 'hi')
    .addRow('c', 'carrot', 'meow')
    .addRow('e', 'elephants')
console.log(table3.toString())

// Use data from mongoDB
import { usersCollection } from './database.ts'
// Grab a user
var user = await usersCollection.findOne({ username: "dimitriskl" })
// delete _id since it causes trouble
delete user['_id']
// Get the headings and values
var keys = []
var values = []
for(var k in user){
    keys.push(k)
    values.push(user[k])
}
// set the table :)
const table4 = AsciiTable.fromJSON({
    title: "Grabbed user",
    heading: keys,
    rows: [ values ]
})
console.log(table4.toString())

console.log('testing git stuff')

/**************************
***************************
*** END OF TESTING AREA ***
***************************
**************************/

// Listen
console.log(`Listening on ${SERVER_HOST}:${SERVER_PORT}`)
await application.listen(`${SERVER_HOST}:${SERVER_PORT}`)
