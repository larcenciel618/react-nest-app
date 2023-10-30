import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    // private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  // @UseGuards(JwtAuthGuard)

  @UseGuards(JwtAuthGuard)
  @Get('authenticate')
  authenticate(@Request() request) {
    const user: User = request.user;
    user.password = undefined;
    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() user): Promise<Partial<User>> {
    return await this.authService.login(user);
  }
}
