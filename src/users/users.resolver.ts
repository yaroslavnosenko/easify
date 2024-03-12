import { UserInput } from '@/users/dto/user.input'
import { User } from '@/users/entities/user.entity'
import { UsersService } from '@/users/users.service'
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  users() {
    return this.usersService.findAll()
  }

  @Query(() => User)
  user(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.findOne(id)
  }

  @Mutation(() => User)
  updateUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UserInput
  ) {
    return this.usersService.update(id, input)
  }
}
