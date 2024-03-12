import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class PlaceInput {
  @Field(() => String)
  name: string
}
