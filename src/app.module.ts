import { PlacesModule } from '@/places/places.module'
import { UsersModule } from '@/users/users.module'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { SurveyModule } from './survey/survey.module'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
    }),
    UsersModule,
    PlacesModule,
    SurveyModule,
  ],
})
export class AppModule {}
