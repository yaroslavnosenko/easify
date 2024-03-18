import { Me } from '@/auth/me.decorator'
import { Roles } from '@/auth/roles.decorator'
import { Place } from '@/places/entities/place.entity'
import { UserInput } from '@/users/dto/user.input'
import { User, UserRole } from '@/users/entities/user.entity'
import { UsersService } from '@/users/users.service'
import { ForbiddenError } from '@nestjs/apollo'
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
  @Roles(UserRole.admin, UserRole.moderator)
  users() {
    return this.usersService.findAll()
  }

  @Query(() => User, { description: 'For Admin, Moderator and Me only' })
  @Roles(UserRole.admin, UserRole.user, UserRole.moderator)
  user(@Args('id', { type: () => ID }) id: string, @Me() me: User) {
    if (me.role === UserRole.user && me.id !== id) {
      throw new ForbiddenError('Forbidden resource')
    }
    return this.usersService.findOne(id)
  }

  @Mutation(() => ID, { description: 'For Admin and Me only' })
  @Roles(UserRole.admin, UserRole.user)
  async updateUser(
    @Me() me: User,
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UserInput
  ) {
    if (me.role === UserRole.user && me.id !== id) {
      throw new ForbiddenError('Forbidden resource')
    }
    const user = await this.usersService.update(id, input)
    return user.id
  }

  @Mutation(() => UserRole, { description: 'For Admin only' })
  @Roles(UserRole.admin)
  changeRole(
    @Args('userId', { type: () => ID }) id: string,
    @Args('role', { type: () => UserRole }) role: UserRole
  ) {
    return this.usersService.changeRole(id, role)
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('id', { type: () => ID }) id: string) {
    return true
  }

  @ResolveField(() => [Place])
  places(@Parent() user: User) {
    return user.places
  }
}
