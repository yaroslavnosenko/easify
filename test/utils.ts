import { INestApplication } from '@nestjs/common'
import * as req from 'supertest'

const gql = '/graphql'

export const request = (
  app: INestApplication,
  query: any,
  token: string = ''
) => {
  return req(app.getHttpServer())
    .post(gql)
    .set({ Authorization: 'Bearer ' + token })
    .send({ query })
}
