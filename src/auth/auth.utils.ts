import { User } from '@/users/entities/user.entity'
import { ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const extractUser = (context: ExecutionContext): User | null =>
  GqlExecutionContext.create(context).getContext()?.req?.user
