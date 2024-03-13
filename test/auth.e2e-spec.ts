import { AppModule } from '@/app.module'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { jsonToGraphQLQuery as gqlFromJson } from 'json-to-graphql-query'
import { graphql } from './utils'

describe('Auth', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterEach(async () => {
    await app.close()
  })

  it('can authorise user', () => {
    const mutation = gqlFromJson({
      mutation: {
        auth: {
          __args: { input: { googleToken: 'test' } },
          token: true,
          user: {
            id: true,
            firstName: true,
          },
        },
      },
    })
    return graphql(app, mutation)
      .expect(200)
      .expect((res) => {
        const data = res.body.data.auth
        expect(data.token).toBeDefined()
        expect(data.user.firstName).toEqual('test')
      })
  })
})
