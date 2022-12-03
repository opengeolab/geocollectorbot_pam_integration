import type { EnvSchemaOpt } from 'env-schema'
import { envSchema } from 'env-schema'
import { fastify as buildFastify } from 'fastify'
import type { FastifyInstance, FastifyServerOptions } from 'fastify'

import * as sendNoteToPam from './api/send-note-to-pam'
import type { Environment } from './schemas/environment'
import { environmentSchema } from './schemas/environment'

const DEFAULT_PORT = 8080

export const buildService = async (): Promise<FastifyInstance> => {
  const envOptions: EnvSchemaOpt = { dotenv: true, schema: environmentSchema }
  const environment = envSchema(envOptions) as Environment

  const fastifyOpts: FastifyServerOptions = { logger: { level: environment.LOG_LEVEL } }
  const fastify = buildFastify(fastifyOpts)

  fastify.decorate('env', environment)

  fastify.post('/send-note-to-pam', { schema: sendNoteToPam.schema }, sendNoteToPam.handler)

  await fastify.ready()

  return fastify
}

buildService()
  .then(fastify => fastify.listen({ host: '0.0.0.0', port: fastify.env.PORT ?? DEFAULT_PORT }))
  .catch(err => { throw err })
