import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@ptotaram-6dc6decb-fe45-4b95-809d-16e846ec50e1/data';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }

  async login(username: string, pass: string) {
    const user = await this.userRepository.findOne({
      where: { username },
      select: ['id', 'email', 'password']
    })



    if (user && (await bcrypt.compare(pass, user.password))) {
      const payload = {
        sub: user.id,
        username: user.username,
        email: user.email
      };

      return {
        accessToken: this.jwtService.sign(payload)
      }
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}
