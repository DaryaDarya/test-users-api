import { Test, TestingModule } from '@nestjs/testing';
import AppModule from 'src/app.module';
import User from 'src/app/entities/user.entity';
import errors from 'src/helpers/errors';
import { UserCreateDto, UserDto } from 'src/app/dto/users.dto';
import { BadRequestException } from '@nestjs/common';
import UsersService from '../app/api/users/users.service';
import UsersController from '../app/api/users/users.controller';

describe('UsersController', () => {
  let app;
  let usersController: UsersController;
  let usersService: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    await app.init();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('get', () => {
    it('should throw "Not Found" error', async () => {
      jest.spyOn(usersService, 'get').mockResolvedValue(null);
      await expect(usersController.get(1)).rejects.toThrow('Not Found');
    });

    it('should return User', async () => {
      jest.spyOn(usersService, 'get').mockResolvedValue(new User());
      await expect(usersController.get(1)).not.toBe(null);
    });
  });

  describe('create', () => {
    it('should throw "Bad Request" error', async () => {
      jest.spyOn(usersService, 'create').mockImplementation(() => {
        throw new errors.ValidateError('Invalid');
      });
      await expect(usersController.create(new UserCreateDto())).rejects.toThrowError(BadRequestException);
    });

    it('should throw "Error" error', async () => {
      jest.spyOn(usersService, 'create').mockImplementation(() => {
        throw new Error('Invalid');
      });
      await expect(usersController.create(new UserCreateDto())).rejects.toThrowError(Error);
    });

    it('should return created value', async () => {
      jest.spyOn(usersService, 'create').mockResolvedValue(new UserDto());
      await expect(usersController.create(new UserCreateDto())).toBeDefined();
    });
  });
});
