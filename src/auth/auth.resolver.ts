import { AuthService } from '@/auth/auth.service'
import { AuthInput } from '@/auth/dto/auth.input'
import { Auth } from '@/auth/entities/Auth.entity'
import { Args, Mutation, Resolver } from '@nestjs/graphql'

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  auth(@Args('input') input: AuthInput) {
    return this.authService.auth(input)
  }
}
