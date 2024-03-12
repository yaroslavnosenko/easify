import { AuthService } from '@/auth/auth.service'
import { TokenInput } from '@/auth/dto/token.input'
import { Auth } from '@/auth/entities/Auth.entity'
import { Args, Mutation, Resolver } from '@nestjs/graphql'

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  auth(@Args('input') input: TokenInput) {
    return this.authService.auth(input)
  }
}
