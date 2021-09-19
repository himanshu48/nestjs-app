import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { PostgresErrorCode } from '../utils/enum/postgresErrorCodes.enum';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  private saltRounds = 10;
  async signUp(signupDto: SignupDto): Promise<void> {
    const { username, password, email } = signupDto;

    try {
      const user = new UserEntity();
      user.username = username;
      user.email = email;
      return bcrypt.hash(password, this.saltRounds).then(async (hash) => {
        user.password = hash;
        await this.save(user);
      });
    } catch (err) {
      if (err.code === PostgresErrorCode.UniqueViolation) {
        throw new ConflictException('Username already exist.');
      }
      throw new InternalServerErrorException();
    }
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });
    if (user) {
      return bcrypt.compare(password, user.password).then((result) => {
        if (result) {
          return user.username;
        }
        throw new UnauthorizedException('Invalid credentials.');
      });
    } else {
      throw new UnauthorizedException('Invalid credentials.');
    }
  }
}
