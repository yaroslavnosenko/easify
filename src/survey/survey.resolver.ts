import { QuestionInput } from '@/survey/dto/question.input'
import { Question } from '@/survey/entities/question.entity'
import { SurveyService } from '@/survey/survey.service'
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver(() => Question)
export class SurveyResolver {
  constructor(private readonly surveyService: SurveyService) {}

  @Query(() => [Question])
  survey() {
    return this.surveyService.findAll()
  }

  @Mutation(() => Question)
  createQuestion(@Args('input') input: QuestionInput) {
    return this.surveyService.createQuestion(input)
  }

  @Mutation(() => Question)
  updateQuestion(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: QuestionInput
  ) {
    return this.surveyService.updateQuestion(id, input)
  }
}
