import type { FastifySchema } from 'fastify'
import type { FromSchema } from 'json-schema-to-ts'

const bodySchema = {
  properties: {
    chatId: { type: 'string' },
    description: { type: 'string' },
    id: { type: 'string' },
    location: { type: 'string' },
    media: { items: { type: 'string' }, type: 'array' },
    site_of_interest: {
      enum: [
        'spina-verde',
        'pineta',
        'fiori',
        'breggia',
        'penz',
      ],
      type: 'string',
    },
    title: { type: 'string' },
  },
  required: ['chatId', 'id', 'title', 'site_of_interest'],
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
