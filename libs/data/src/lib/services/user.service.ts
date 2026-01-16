import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findOneByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username },
      select: ['id', 'email', 'password']
    });
  }
}
