import _ from 'lodash';
import { Repository, EntityRepository, QueryFailedError } from 'typeorm';
import User from 'src/app/entities/user.entity';
import Organization from 'src/app/entities/organization.entity';
import { UserCreateDto } from 'src/app/dto/users.dto';
import errors from 'src/helpers/errors';

@EntityRepository(User)
export default class UsersRepository extends Repository<User> {
  async createOne(user: UserCreateDto) {
    return this.manager
      .transaction(async transactionalManager => {
        const orgTransactionRepository = transactionalManager.getRepository(Organization);
        let org = await orgTransactionRepository.findOne({
          name: user.organization,
        });
        if (!org) {
          const newOrg = orgTransactionRepository.create({
            name: user.organization,
          });
          org = await orgTransactionRepository.save(newOrg);
        }

        const newUser = this.create({
          ..._.omit(user, 'organization'),
          organization: org,
        });

        return transactionalManager.save(newUser);
      })
      .catch(err => {
        if (err instanceof QueryFailedError && err['constraint'] === 'users_roles_role_id_fkey') {
          throw new errors.ValidateError('Invalid roles');
        }
        throw err;
      });
  }
}
