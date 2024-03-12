import { Field, ID, InputType, Int } from '@nestjs/graphql'

@InputType()
export class AnswerInput {
  @Field(() => ID)
  placeId: string

  @Field(() => ID)
  questionId: string

  @Field(() => Int)
  points: number
}
