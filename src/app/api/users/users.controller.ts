import {
  Controller,
  Get,
  Post,
  Body,
  ParseIntPipe,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import errors from 'src/helpers/errors';
import { ApiOkResponse, OmitType, PickType, ApiBadRequestResponse, ApiNotFoundResponse, ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import UsersService from './users.service';
import { UserCreateDto, UserDto } from '../../dto/users.dto';

@ApiTags('users')
@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @ApiOkResponse({ type: UserDto })
  @ApiNotFoundResponse()
  async get(@Param('id', new ParseIntPipe()) id: number): Promise<UserDto> {
    const user = await this.usersService.get(id);
    if (!user) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Post()
  @ApiCreatedResponse({ type: UserDto })
  @ApiBadRequestResponse()
  async create(@Body() user: UserCreateDto): Promise<UserDto> {
    try {
      const createdUser = await this.usersService.create(user);
      return this.usersService.get(createdUser.id);
    } catch (err) {
      if (err instanceof errors.ValidateError) {
        throw new BadRequestException(err.message);
      }
      throw err;
    }
  }

  @Get()
  @ApiOkResponse({ type: [OmitType(UserDto, ['roles'])] })
  getAll(): Promise<Omit<UserDto, 'roles'>[]> {
    return this.usersService.findAllWithOrg();
  }

  @Delete(':id')
  @ApiOkResponse({ type: PickType(UserDto, ['id']) })
  delete(@Param('id', new ParseIntPipe()) id: number) {
    return this.usersService.delete(id);
  }
}
