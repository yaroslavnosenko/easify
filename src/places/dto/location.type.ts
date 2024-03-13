import { Field, InputType, ObjectType } from '@nestjs/graphql'

@InputType()
export class LocationInput {
  @Field(() => Number)
  lat: number

  @Field(() => Number)
  lng: number
}

@ObjectType()
export class Location {
  @Field(() => Number)
  lat: number

  @Field(() => Number)
  lng: number
}
