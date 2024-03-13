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
        host: configService.get('postgres.host')!,
        port: configService.get('postgres.port')!,
        username: configService.get('postgres.user')!,
        password: configService.get('postgres.password')!,
        database: configService.get('postgres.database')!,
        logging: false,
        synchronize: true,
        entities,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
