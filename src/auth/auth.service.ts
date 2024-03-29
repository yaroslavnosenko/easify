import { AuthInput } from '@/auth/dto/auth.input'
import { Auth } from '@/auth/entities/auth.entity'
import { UsersService } from '@/users/users.service'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async auth(input: AuthInput): Promise<Auth> {
    const { token } = input
    const googleUser = await this.getUserByGoogleToken(token)
    let user = await this.usersService.findOneByEmail(googleUser.email)
    if (!user) {
      user = await this.usersService.create(googleUser)
    }
    const payload = { sid: user.id }
    const appToken = await this.jwtService.signAsync(payload)
    return { token: appToken }
  }

  private async getUserByGoogleToken(token: string) {
    // Todo Google Auth
    return { email: token + '@mail.com', firstName: token, lastName: token }
  }
}
