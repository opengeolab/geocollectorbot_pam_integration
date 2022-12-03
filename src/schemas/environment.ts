import type { FromSchema } from 'json-schema-to-ts'

const DEFAULT_LOG_LEVEL = 'info'

export const environmentSchema = {
  properties: {
    BOT_BASE_URL: { type: 'string' },
    LOG_LEVEL: {
      default: DEFAULT_LOG_LEVEL,
      enum: ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'],
      type: 'string',
    },
    PAM_BASE_URL: { type: 'string' },
    PORT: { type: 'number' },
  },
  required: ['BOT_BASE_URL', 'LOG_LEVEL', 'PAM_BASE_URL'],
  type: 'object',
} as const

export type Environment = FromSchema<typeof environmentSchema>
