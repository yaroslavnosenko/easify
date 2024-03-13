import { Roles } from '@/auth/roles.decorator'
import { UserInput } from '@/users/dto/user.input'
import { User, UserRole } from '@/users/entities/user.entity'
import { UsersService } from '@/users/users.service'
import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { description: 'For Admin and Moderator only' })
  users() {
    return this.usersService.findAll()
  }

  @Query(() => User, { description: 'For Admin, Moderator and Me only' })
  @Roles(UserRole.admin, UserRole.user, UserRole.moderator)
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

  @ResolveField()
  async places(@Parent() user: User) {
    console.log(user)
    const places = await user.places
    return places
  }
}
