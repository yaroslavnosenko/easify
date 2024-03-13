import { Roles } from '@/auth/roles.decorator'
import { LocationInput } from '@/places/dto/location.input'
import { PlaceInput } from '@/places/dto/place.input'
import { Place } from '@/places/entities/place.entity'
import { PlacesService } from '@/places/places.service'
import { UserRole } from '@/users/entities/user.entity'
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver(() => Place)
export class PlacesResolver {
  constructor(private readonly placesService: PlacesService) {}

  @Query(() => [Place], { description: 'For Admin and Moderator only' })
  @Roles(UserRole.admin, UserRole.moderator)
  places() {
    return this.placesService.findAll()
  }

  @Query(() => [Place])
  placesByLocation(@Args('input') input: LocationInput) {
    return this.placesService.findAllByLocation(input)
  }

  @Query(() => Place)
  place(@Args('id', { type: () => ID }) id: string) {
    return this.placesService.findOne(id)
  }

  @Mutation(() => Place)
  createPlace(
    @Args('userId', { type: () => ID }) userId: string,
    @Args('input') input: PlaceInput
  ) {
    return this.placesService.create(userId, input)
  }

  @Mutation(() => Place)
  updatePlace(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: PlaceInput
  ) {
    return this.placesService.update(id, input)
  }
}
