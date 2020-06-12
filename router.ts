import { Router } from 'https://deno.land/x/oak/mod.ts'

/***************
** Middleware **
***************/
import { authMiddleware } from './middleware/authUser.ts'

/***********
** Routes **
***********/
// root
import { welcomeMessage } from './controllers/welcome.ts'
// users
import { getUsers } from './controllers/users/getUsers.ts'
import { getUser } from './controllers/users/getUser.ts'
import { createUser } from './controllers/users/createUser.ts'
import { updateUser } from './controllers/users/updateUser.ts'
import { deleteUser } from './controllers/users/deleteUser.ts'
// actions
import { register } from './controllers/actions/register.ts'
import { login } from './controllers/actions/login.ts'
import { guest } from './controllers/actions/guest.ts'
import { auth } from './controllers/actions/auth.ts'

const router = new Router()

router
    // root
    .get('/', welcomeMessage)
    // users
    .get('/u', getUsers)
    .get('/u/:username', getUser)
    .post('/u', createUser)
    .put('/u/:username', updateUser)
    .delete('/u/:username', deleteUser)
    // actions
    .post('/register', register)
    .post('/login', login)
    .get('/guest', guest)
    .get('/auth', authMiddleware, auth)

export { router }
