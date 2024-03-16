import { UserInput } from '@/users/dto/user.input'
import { User, UserRole } from '@/users/entities/user.entity'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class UsersService {
  constructor(private configService: ConfigService) {}

  findAll(): Promise<User[]> {
    return User.find()
  }

  findOne(id: string): Promise<User> {
    return User.findOneBy({ id })
  }

  findOneByEmail(email: string): Promise<User> {
    return User.findOneBy({ email })
  }

  create({ email, firstName, lastName, role = UserRole.user }): Promise<User> {
    if (this.configService.getOrThrow('admin.email') === email) {
      role = UserRole.admin
    }
    return User.create({ email, firstName, lastName, role }).save()
  }

  async update(id: string, input: UserInput): Promise<User> {
    const user = await User.findOneBy({ id })
    return User.create({ ...user, ...input }).save()
  }

  async changeRole(id: string, role: UserRole): Promise<UserRole> {
    const user = await User.findOneBy({ id })
    user.role = role
    await user.save()
    return role
  }
}
