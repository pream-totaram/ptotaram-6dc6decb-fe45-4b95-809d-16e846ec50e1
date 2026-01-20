import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@ptotaram-6dc6decb-fe45-4b95-809d-16e846ec50e1/data';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

jest.mock('bcrypt');
describe('AuthService', () => {
  let service: AuthService;
  let userRepository: jest.Mocked<Repository<User>>;
  let jwtService: JwtService;

  const mockUserRepository = () => ({
    findOne: jest.fn(),
    save: jest.fn()
  });

  const mockJwtService = () => ({
    sign: jest.fn(() => 'test+token')
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useFactory: mockUserRepository
        },
        {
          provide: JwtService,
          useFactory: mockJwtService
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  it('should return a token if credentials are valid', async () => {
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    let token = await service.login('test');
    expect(token).toBeDefined();
    expect(token).toHaveProperty('accessToken');
  });


  // it('should throw an exception if credentials are invalid', async () => {
  //   (bcrypt.compare as jest.Mock).mockResolvedValue(false);
  //   const mockUser = {
  //     id: 'uuid-123',
  //     email: 'test@test.com',
  //     username: 'test',
  //     password: 'hashed_password'
  //   };
  //
  //   userRepository.findOne.mockResolvedValue(mockUser as User);
  //
  //   await expect(service.login('test'))
  //     .rejects
  //     .toThrow(UnauthorizedException);
  // })

});
