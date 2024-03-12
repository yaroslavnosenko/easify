import { UserInput } from '@/users/dto/user.input'
import { User, UserType } from '@/users/entities/user.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UsersService {
  findAll(): Promise<User[]> {
    return User.find()
  }

  findOne(id: string): Promise<User> {
    return User.findOneBy({ id })
  }

  findOneByEmail(email: string): Promise<User> {
    return User.findOneBy({ email })
  }

  create({ email, firstName, lastName, type = UserType.user }): Promise<User> {
    return User.create({ email, firstName, lastName, type }).save()
  }

  async update(id: string, input: UserInput): Promise<User> {
    const user = await User.findOneBy({ id })
    return User.create({ ...user, ...input }).save()
  }
}
