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

    let req = context.switchToHttp().getRequest()
    if (!req) {
      req = GqlExecutionContext.create(context).getContext().req
    }

    let user: User | null = null
    const token = this.extractTokenFromHeader(req.headers)
    if (token) {
      const { sid } = this.jwtService.verify(token)
      user = await this.usersService.findOne(sid)
      req.user = user
    } else {
      req.user = null
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

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req
  }
}
