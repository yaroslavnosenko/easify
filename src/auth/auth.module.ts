import { AuthResolver } from '@/auth/auth.resolver'
import { AuthService } from '@/auth/auth.service'
import { UsersModule } from '@/users/users.module'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get('jwt.secret')!,
        signOptions: { expiresIn: configService.get('jwt.expires')! },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
