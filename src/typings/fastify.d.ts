// eslint-disable-next-line @typescript-eslint/no-unused-vars
import fastify from 'fastify'

import type { Environment } from '../schemas/environment'

declare module 'fastify' {
  interface FastifyInstance {
    env: Environment
  }
}
