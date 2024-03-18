import { Me } from '@/auth/me.decorator'
import { Public } from '@/auth/public.decorator'
import { Roles } from '@/auth/roles.decorator'
import { Location, LocationInput } from '@/places/dto/location.type'
import { PlaceInput } from '@/places/dto/place.input'
import { Place } from '@/places/entities/place.entity'
import { PlacesService } from '@/places/places.service'
import { User, UserRole } from '@/users/entities/user.entity'
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

@Resolver(() => Place)
export class PlacesResolver {
  constructor(private readonly placesService: PlacesService) {}

  @Query(() => [Place], { description: 'For Admin and Moderator only' })
  @Roles(UserRole.admin, UserRole.moderator)
  places(): Promise<Place[]> {
    return this.placesService.findAll()
  }

  @Query(() => [Place], { description: 'Public' })
  @Public()
  placesByLocation(@Args('input') input: LocationInput): Promise<Place[]> {
    return this.placesService.findAllByLocation(input)
  }

  @Query(() => Place, { nullable: true, description: 'Public' })
  @Public()
  place(@Args('id', { type: () => ID }) id: string): Promise<Place | null> {
    return this.placesService.findOne(id)
  }

  @Mutation(() => ID)
  @Roles(UserRole.admin, UserRole.moderator, UserRole.user)
  createPlace(
    @Args('userId', { type: () => ID }) userId: string,
    @Args('input') input: PlaceInput,
    @Me() me: User
  ): Promise<string> {
    if (me.role === UserRole.user && userId !== me.id) {
      throw new ForbiddenError('Forbidden resource')
    }
    return this.placesService.create(userId, input)
  }

  @Mutation(() => ID)
  @Roles(UserRole.admin, UserRole.moderator, UserRole.user)
  async updatePlace(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: PlaceInput,
    @Me() me: User
  ): Promise<string> {
    const place = await this.placesService.findOne(id)
    if (!place) {
      throw new ForbiddenError('Forbidden resource')
    }
    const owner = await place.owner
    if (me.role === UserRole.user && owner.id !== me.id) {
      throw new ForbiddenError('Forbidden resource')
    }
    return this.placesService.update(id, input)
  }

  @Mutation(() => Boolean)
  deletePlace(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    return this.placesService.delete(id)
  }

  @ResolveField(() => Location)
  location(@Parent() place: Place): Location {
    const {
      location: { coordinates },
    } = place
    const [lat, lng] = coordinates
    return { lat, lng }
  }

  @ResolveField(() => User)
  async owner(@Me() me: User, @Parent() place: Place): Promise<User> {
    if (![UserRole.admin, UserRole.moderator].includes(me.role)) {
      throw new ForbiddenError('Forbidden resource')
    }
    return place.owner
  }
}
