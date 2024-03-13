import { ROLES_KEY } from '@/auth/roles.decorator'
import { UserRole } from '@/users/entities/user.entity'
import { UsersService } from '@/users/users.service'
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class RolesGuard implements CanActivate {
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
    if (!requiredRoles) {
      return true
    }

    let req = context.switchToHttp().getRequest()
    if (!req) {
      req = GqlExecutionContext.create(context).getContext().req
    }

    const token = this.extractTokenFromHeader(req.headers)
    const { sid } = this.jwtService.verify(token)

    if (!sid) {
      return false
    }

    const user = await this.usersService.findOne(sid)
    return requiredRoles.includes(user.role)
  }

  extractTokenFromHeader(headers: any): string | undefined {
    const [type, token] = headers['authorization']?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
