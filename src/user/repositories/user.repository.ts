import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  getUserByAge(age: number): Promise<User> {
    return this.findOne({
      where: {
        age: age,
      },
    });
  }
}
