import { PlacesModule } from '@/places/places.module'
import { SurveyModule } from '@/survey/survey.module'
import { UsersModule } from '@/users/users.module'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { AuthModule } from './auth/auth.module'
import { DatabaseModule } from './database/database.module'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: process.env.NODE_ENV !== 'production',
      autoSchemaFile: true,
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    PlacesModule,
    SurveyModule,
  ],
})
export class AppModule {}
