import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constants';
// import { UserModule } from 'src/user/user.module';
// import { PassportModule } from '@nestjs/passport';
// import { JwtModule } from '@nestjs/jwt';

const passModule = PassportModule.register({ defaultStrategy: 'jwt' });
export const customJwtModule = JwtModule.register({
  //@TODO must be more secure
  secret: jwtConstants.secret,
  signOptions: { expiresIn: '30 days' },
});

@Module({
  imports: [TypeOrmModule.forFeature([User]), customJwtModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [passModule, customJwtModule],
})
export class AuthModule {}
