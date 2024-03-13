import { Field, InputType, registerEnumType } from '@nestjs/graphql'

enum AuthProvider {
  google = 'google',
}

registerEnumType(AuthProvider, {
  name: 'AuthProvider',
})

@InputType()
export class AuthInput {
  @Field(() => String)
  token: string

  @Field(() => AuthProvider)
  provider: AuthProvider
}
