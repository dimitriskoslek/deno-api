import { Application } from 'https://deno.land/x/oak/mod.ts'

import { router } from './router.ts'

// Set application and use router
const application = new Application()
application.use(router.routes())
application.use(router.allowedMethods())

export { application }
