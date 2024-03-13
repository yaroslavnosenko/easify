import { User } from '@/users/entities/user.entity'
import { ForbiddenError } from '@nestjs/apollo'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const Me = createParamDecorator(
  (_: unknown, context: ExecutionContext): User | undefined => {
    const ctx = GqlExecutionContext.create(context)
    const { user } = ctx.getContext().req
    if (!user) throw new ForbiddenError('Forbidden resource')
    return user
  }
)
