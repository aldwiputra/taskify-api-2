import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UnauthenticatedGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const isLoggedIn = req.isAuthenticated();

    console.log(isLoggedIn);
    if (isLoggedIn) {
      throw new UnauthorizedException('Logout first before logging in');
    }

    return true;
  }
}
