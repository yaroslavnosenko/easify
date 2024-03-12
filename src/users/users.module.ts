import { UsersResolver } from '@/users/users.resolver'
import { UsersService } from '@/users/users.service'
import { Module } from '@nestjs/common'

@Module({
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
