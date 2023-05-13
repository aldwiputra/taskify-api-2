import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const isLoggedIn = req.isAuthenticated();

    if (!isLoggedIn) {
      throw new UnauthorizedException('Please login to access this resource');
    }

    return isLoggedIn;
  }
}
