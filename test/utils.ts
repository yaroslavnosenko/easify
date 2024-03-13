import { Auth } from '@/auth/entities/auth.entity'
import { INestApplication } from '@nestjs/common'
import { jsonToGraphQLQuery as gqlFromJson } from 'json-to-graphql-query'
import * as req from 'supertest'

const gql = '/graphql'

export const graphql = (
  app: INestApplication,
  query: any,
  token: string = ''
) => {
  return req(app.getHttpServer())
    .post(gql)
    .set({ Authorization: 'Bearer ' + token })
    .send({ query })
}

export const auth = async (
  app: INestApplication,
  googleToken: string
): Promise<Auth> => {
  const query = gqlFromJson({
    mutation: {
      auth: {
        __args: { input: { googleToken } },
        token: true,
        user: {
          id: true,
          type: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  })
  return req(app.getHttpServer())
    .post(gql)
    .send({ query })
    .then((res) => res.body.data.auth)
}
