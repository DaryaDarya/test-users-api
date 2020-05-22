import { get } from 'config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import User from './entities/user.entity';
import Organization from './entities/organization.entity';
import Role from './entities/role.entity';

export default class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      name: get('environment'),
      type: 'postgres',
      ...get('typeOrm'),
      entities: [User, Organization, Role],
    };
  }
}
