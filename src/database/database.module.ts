import { entities } from '@/database/database.entities'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('postgres.host')!,
        port: configService.getOrThrow('postgres.port')!,
        username: configService.getOrThrow('postgres.user')!,
        password: configService.getOrThrow('postgres.password')!,
        database: configService.getOrThrow('postgres.database')!,
        logging: false,
        synchronize: true,
        entities,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
