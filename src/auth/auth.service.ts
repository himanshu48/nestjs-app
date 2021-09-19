import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { IResponse } from '../utils/interface/response.interface';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { SignupDto } from './dto/signup.dto';
import { UserRepository } from './user.repository';
import { JwtPayload } from './interface/jwt-payload.interface';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<IResponse> {
    LoggerService.info(
      `Signup request received for email: ${signupDto.email}`,
      'AuthService.signup',
    );
    await this.userRepo.signUp(signupDto);
    const response: IResponse = {
      status: true,
      message: 'User registered successfully.',
    };
    return response;
  }

  async signin(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    LoggerService.info(
      `Signin request received for username: ${authCredentialsDto.username}`,
      'AuthService.signin',
    );
    const username = await this.userRepo.validateUserPassword(
      authCredentialsDto,
    );
    if (!username) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const payload: JwtPayload = { username };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
