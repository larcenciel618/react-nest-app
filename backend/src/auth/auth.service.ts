// import bcrypt = require('bcrypt');
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { JWTPayload } from './jwt.strategy';

type PasswordOmitUser = Omit<User, 'password'>;

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(payload: JWTPayload): Promise<PasswordOmitUser | null> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: payload.id })
      .select(['user.id', 'user.firstName', 'user.lastName', 'user.email'])
      .getOne();

    return user;
  }

  private createToken(user: Partial<User>): string {
    const accessToken = this.jwtService.sign({
      id: user.id,
      lastName: user.lastName,
      firstName: user.firstName,
      email: user.email,
    });
    return accessToken;
  }

  async login(user: Partial<User>): Promise<any> {
    const existUser = await this.userRepository.findOne({
      where: { email: user.email, password: user.password },
    });
    console.log('existUser: ', existUser);
    if (!existUser) {
      console.log('error');
      throw new BadRequestException('The user not found');
    }
    const token = this.createToken(existUser);
    console.log('createdToken: ', token);
    return Object.assign(existUser, { token });
  }
}
