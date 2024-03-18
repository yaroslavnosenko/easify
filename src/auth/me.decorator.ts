import { extractUser } from '@/auth/auth.utils'
import { User } from '@/users/entities/user.entity'
import { ForbiddenError } from '@nestjs/apollo'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const Me = createParamDecorator(
  (_: unknown, context: ExecutionContext): User | undefined => {
    const user = extractUser(context)
    if (!user) throw new ForbiddenError('Forbidden resource')
    return user
  }
)
