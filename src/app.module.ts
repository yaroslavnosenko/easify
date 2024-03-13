import { AuthModule } from '@/auth/auth.module'
import { configs } from '@/config/configurations'
import { DatabaseModule } from '@/database/database.module'
import { PlacesModule } from '@/places/places.module'
import { SurveyModule } from '@/survey/survey.module'
import { UsersModule } from '@/users/users.module'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configs] }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: process.env.NODE_ENV !== 'production',
      autoSchemaFile: true,
      formatError: (err) => ({
        message: err.message,
        status: err.extensions.code,
      }),
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    PlacesModule,
    SurveyModule,
  ],
})
export class AppModule {}
