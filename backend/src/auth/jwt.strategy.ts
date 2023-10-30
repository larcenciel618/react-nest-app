import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

export interface JWTPayload {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JWTPayload) {
    const user = await this.authService.validateUser(payload);

    if (!user) {
      throw new UnauthorizedException('user authorization failed');
    }
    return user;
  }
}
