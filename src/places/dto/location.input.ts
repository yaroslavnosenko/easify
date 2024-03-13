import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class LocationInput {
  @Field(() => Number)
  lat: string

  @Field(() => Number)
  lng: string
}
