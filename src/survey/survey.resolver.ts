import { QuestionInput } from '@/survey/dto/question.input'
import { Answer } from '@/survey/entities/answer.entity'
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

  @Mutation(() => Question, { description: 'For Admin only' })
  createQuestion(@Args('input') input: QuestionInput) {
    return this.surveyService.createQuestion(input)
  }

  @Mutation(() => Question, { description: 'For Admin only' })
  updateQuestion(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: QuestionInput
  ) {
    return this.surveyService.updateQuestion(id, input)
  }

  @Mutation(() => Boolean)
  deleteQuestion(@Args('id', { type: () => ID }) id: string) {
    return
  }

  @Mutation(() => Answer)
  createAnswer(@Args('input') input: QuestionInput) {
    return this.surveyService.createQuestion(input)
  }

  @Mutation(() => Answer)
  updateAnswer(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: QuestionInput
  ) {
    return this.surveyService.updateQuestion(id, input)
  }

  @Mutation(() => Boolean)
  deleteAnswer(@Args('id', { type: () => ID }) id: string) {
    return
  }
}
