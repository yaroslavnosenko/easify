import { SurveyResolver } from '@/survey/survey.resolver'
import { SurveyService } from '@/survey/survey.service'
import { Module } from '@nestjs/common'

@Module({
  providers: [SurveyResolver, SurveyService],
})
export class SurveyModule {}
