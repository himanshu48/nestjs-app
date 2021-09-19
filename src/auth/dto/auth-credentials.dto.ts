import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @ApiProperty()
  username!: string;

  @IsString()
  @ApiProperty()
  password!: string;
}
