import { Module } from '@nestjs/common';
import UsersControllerModule from 'src/app/api/users/users.module';

@Module({
  imports: [UsersControllerModule],
})
export default class ApiModule {}
