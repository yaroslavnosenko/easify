import { IS_PUBLIC_KEY } from '@/auth/public.decorator'
import { ROLES_KEY } from '@/auth/roles.decorator'
import { User, UserRole } from '@/users/entities/user.entity'
import { UsersService } from '@/users/users.service'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    )
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    const request = GqlExecutionContext.create(context).getContext().req
    let user: User | null = null
    const token = this.extractTokenFromHeader(request.headers)
    if (token) {
      const { sid } = this.jwtService.verify(token)
      user = await this.usersService.findOne(sid)
      request.user = user
    } else {
      request.user = null
    }
    if (isPublic) {
      return true
    }
    if (!user) {
      return false
    }
    if (!requiredRoles) {
      return true
    }
    return requiredRoles.includes(user.role)
  }

  extractTokenFromHeader(headers: any): string | undefined {
    const [type, token] = headers['authorization']?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
