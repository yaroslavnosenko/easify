import { entities } from '@/database/database.entities'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'dev',
      password: 'dev',
      database: 'easify',
      synchronize: true,
      logging: false,
      entities,
    }),
  ],
})
export class DatabaseModule {}
