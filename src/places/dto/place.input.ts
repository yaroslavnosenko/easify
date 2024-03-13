import { LocationInput } from '@/places/dto/location.type'
import { PlaceType } from '@/places/entities/place.entity'
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class PlaceInput {
  @Field(() => String)
  name: string

  @Field(() => LocationInput)
  location: LocationInput

  @Field(() => PlaceType)
  type: PlaceType
}
