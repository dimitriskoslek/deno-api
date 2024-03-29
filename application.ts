import { Application } from 'https://deno.land/x/oak@v6.2.0/mod.ts'
import { oakCors } from "https://deno.land/x/cors/mod.ts";

import { router } from './router.ts'

// Set application and use router
const application = new Application()
application.use(oakCors())
application.use(router.routes())
application.use(router.allowedMethods())

export { application }
