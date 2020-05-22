import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TypeOrmConfigService from 'src/app/typeorm.config';
import ApiModule from 'src/app/api/api.module';

@Module({
  imports: [TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }), ApiModule],
})
export default class AppModule {}
