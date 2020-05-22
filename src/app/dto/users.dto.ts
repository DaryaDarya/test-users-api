import { IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class UserRoleDto {
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @ApiProperty()
  name: string;
}

class UserOrgDto {
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @ApiProperty()
  name: string;
}

class UserCreateDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  login: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  organization: string;

  @IsNotEmpty()
  @ApiProperty({ type: [UserRoleDto] })
  roles: UserRoleDto[];
}

class UserDto {
  @IsPositive()
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  login: string;

  @ApiProperty({ type: UserOrgDto })
  organization: UserOrgDto;

  @ApiProperty({ type: [UserRoleDto] })
  roles: UserRoleDto[];
}

export { UserCreateDto, UserDto };
