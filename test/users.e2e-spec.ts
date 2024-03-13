import { AppModule } from '@/app.module'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { jsonToGraphQLQuery as gqlFromJson } from 'json-to-graphql-query'
import { DataSource } from 'typeorm'
import { auth, graphql } from './utils'

describe('Users', () => {
  let app: INestApplication
  let data: DataSource

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
    app = moduleFixture.createNestApplication()
    data = app.get(DataSource)
    await data.synchronize(true)
    await app.init()
  })

  afterEach(async () => {
    await app.close()
  })

  it('user can update full name', async () => {
    const newName = 'updated'
    const me = await auth(app, 'me')
    const mutation = gqlFromJson({
      mutation: {
        updateUser: {
          __args: {
            id: me.user.id,
            input: { firstName: newName, lastName: newName },
          },
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    })
    return graphql(app, mutation)
      .expect(200)
      .expect((res) => {
        const data = res.body.data
        expect(data.updateUser.firstName).toEqual(newName)
        expect(data.updateUser.firstName).toEqual(newName)
      })
  })

  it('user can not update only one name', async () => {
    const newName = 'updated'
    const me = await auth(app, 'me')
    const invalidMutation = gqlFromJson({
      mutation: {
        updateUser: {
          __args: {
            id: me.user.id,
            input: { lastName: newName },
          },
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    })
    return graphql(app, invalidMutation).expect(400)
  })
})
