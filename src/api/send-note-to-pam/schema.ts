import type { FastifySchema } from 'fastify'
import type { FromSchema } from 'json-schema-to-ts'

const bodySchema = {
  properties: {
    chatId: { type: 'string' },
    description: { type: 'string' },
    id: { type: 'string' },
    location: { type: 'string' },
    media: { items: { type: 'string' }, type: 'array' },
    title: { type: 'string' },
  },
  required: ['chatId', 'id', 'title'],
  type: 'object',
} as const

export type Body = FromSchema<typeof bodySchema>

const schema: FastifySchema = {
  body: bodySchema,
  response: {
    204: {},
    '4xx': {
      properties: {
        error: { type: 'string' },
        message: { type: 'string' },
        statusCode: { type: 'number' },
      },
      type: 'object',
    },
    '5xx': {
      properties: {
        error: { type: 'string' },
        message: { type: 'string' },
        statusCode: { type: 'number' },
      },
      type: 'object',
    },
  },
}

export default schema
