import Buffer from 'buffer'
import type { ReadableStream } from 'stream/web'

import axios from 'axios'
import type { FastifyInstance } from 'fastify'
import type { RouteHandlerMethod } from 'fastify/types/route'
import type { RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault } from 'fastify/types/utils'
import FormData from 'form-data'
import wkx from 'wkx'

import type { Body } from './schema'

interface PostUploadNoteResponse {
  exif_location: never[]
  minio_file: {
    mime: string
    name: string
    url: string
    uuid: string
  }
}

interface PostNoteBody {
  content?: string
  email?: string
  image?: PostUploadNoteResponse['minio_file']
  location?: { x: number; y: number }
  title: string
}

const uploadImage = async (
  service: FastifyInstance,
  url: string,
  photoUrl?: string
): Promise<PostUploadNoteResponse['minio_file'] | undefined> => {
  if (!photoUrl) { return }

  const { env: { BOT_BASE_URL }, log } = service

  const { status: getPhotoStatus, data: photo } = await axios.get<ReadableStream>(
    `${BOT_BASE_URL}${photoUrl}`,
    { responseType: 'stream' }
  )

  if (getPhotoStatus !== 200) {
    log.error({ getPhotoStatus, photo, photoUrl }, `Bot error while downloading photo`)
    throw new Error(`Bot ${photoUrl} responded with status code ${getPhotoStatus}`)
  }

  const form = new FormData()
  form.append('uploaded_file', photo, photoUrl.split('/').pop())

  const { status: uploadStatus, data: uploadResponse } = await axios.post<PostUploadNoteResponse>(
    `${url}/upload/note/`,
    form,
    { headers: { ...form.getHeaders() } }
  )

  if (uploadStatus !== 200) {
    log.error({ detail: (uploadResponse as unknown as { detail: object }).detail, uploadStatus }, `PAM error while uploading photo`)
    throw new Error(`PAM /upload/note responded with status code ${getPhotoStatus}`)
  }

  return uploadResponse.minio_file
}

const convertLocationToCoords = (location?: string): PostNoteBody['location'] => {
  if (!location) { return undefined }

  const wkbBuffer = Buffer.Buffer.from(location, 'hex')
  const geometry = wkx.Geometry.parse(wkbBuffer)
  const { coordinates } = geometry.toGeoJSON() as { coordinates: [number, number] }

  return { x: coordinates[1], y: coordinates[0] }
}

// eslint-disable-next-line func-style
const handler: RouteHandlerMethod<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  {Body: Body}
> = async function (request, reply) {
  const { log, env: { PAM_BASE_URL } } = this
  const { body } = request

  log.debug({ body }, 'POST - /send-note-to-pam')

  const url = `${PAM_BASE_URL}/pam-${body.site_of_interest}/noteapi`

  let imageData: PostUploadNoteResponse['minio_file'] | undefined
  try {
    imageData = await uploadImage(this, url, body.media?.[0])
  } catch (err) {
    log.error({ err }, 'Error uploading image to PAM bucket')
  }

  const postNoteBody: PostNoteBody = {
    content: body.description,
    // email: body.chatId,
    image: imageData,
    location: convertLocationToCoords(body.location),
    title: body.title,
  }

  try {
    const { status, data } = await axios.post<{ detail?: object }>(`${url}/note`, postNoteBody)
    if (status !== 200) {
      log.error({ detail: data.detail, postNoteBody, status }, 'PAM error while uploading note')
      throw new Error(`PAM /note responded with status code ${status}`)
    }
  } catch (err) {
    log.error({ err, postNoteBody }, 'PAM error while uploading note')
    throw new Error('PAM error while uploading note')
  }

  return reply.status(204).send()
}

export default handler
