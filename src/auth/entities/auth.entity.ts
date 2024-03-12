import { User } from '@/users/entities/user.entity'
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Auth {
  @Field(() => String)
  token: string

  @Field(() => User)
  user: User
}
