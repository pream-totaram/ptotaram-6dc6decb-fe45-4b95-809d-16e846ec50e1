import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';

@Module({
  controllers: [],
  providers: [UserService],
  exports: [],
})
export class DataModule {}
