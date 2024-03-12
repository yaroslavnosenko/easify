import { PlaceInput } from '@/places/dto/place.input'
import { Place } from '@/places/entities/place.entity'
import { PlacesService } from '@/places/places.service'
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver(() => Place)
export class PlacesResolver {
  constructor(private readonly placesService: PlacesService) {}

  @Query(() => [Place])
  places() {
    return this.placesService.findAll()
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