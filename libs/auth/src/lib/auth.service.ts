import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserService } from '@ptotaram-6dc6decb-fe45-4b95-809d-16e846ec50e1/data';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async login(user: any) {
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email
    };
    return {
      accessToken: this.jwtService.sign(payload)
    }
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);

    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

}
