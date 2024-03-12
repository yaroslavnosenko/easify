import { QuestionInput } from '@/survey/dto/question.input'
import { Question } from '@/survey/entities/question.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class SurveyService {
  findAll(): Promise<Question[]> {
    return Question.find()
  }

  createQuestion(input: QuestionInput) {
    return Question.create({ ...input }).save()
  }

  async updateQuestion(id: string, input: QuestionInput) {
    const question = await Question.findOneBy({ id })
    return Question.create({ ...question, ...input }).save()
  }
}
