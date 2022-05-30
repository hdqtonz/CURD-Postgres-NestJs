import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  // inject repositry
  constructor(private readonly userRepositry: UserRepository) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    let user: User = new User();
    user.firstname = createUserDto.firstname;
    user.lastname = createUserDto.lastname;
    user.age = createUserDto.age;

    return this.userRepositry.save(user);
  }

  findUserByAge(age: number) {
    return this.userRepositry.getUserByAge(age);
  }

  findAll(): Promise<User[]> {
    return this.userRepositry.find();
  }

  findOne(id: number): Promise<User> {
    const user = this.userRepositry.findOne(id);

    if (!user) throw new UnauthorizedException('User Not Found');

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    let user: User = new User();
    user.firstname = updateUserDto.firstname;
    user.lastname = updateUserDto.lastname;
    user.age = updateUserDto.age;
    user.id = id;

    return this.userRepositry.save(user);
  }

  remove(id: number) {
    return this.userRepositry.delete(id);
  }
}
