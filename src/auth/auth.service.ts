import { TokenInput } from '@/auth/dto/token.input'
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

  async auth(input: TokenInput): Promise<Auth> {
    const { googleToken } = input
    const googleUser = await this.getUserByGoogleToken(googleToken)
    let user = await this.usersService.findOneByEmail(googleUser.email)
    if (!user) {
      user = await this.usersService.create(googleUser)
    }
    const payload = { sub: user.id, typ: user.type }
    const token = await this.jwtService.signAsync(payload)
    return { token, user }
  }

  private async getUserByGoogleToken(token: string) {
    return { email: token + '@mail.com', firstName: token, lastName: token }
  }
}
