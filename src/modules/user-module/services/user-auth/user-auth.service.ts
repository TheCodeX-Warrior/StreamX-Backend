import { Get, Injectable, NotFoundException, Param } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../entities/user-auth.entity';

@Injectable()
export class UserAuthService {
  constructor(private readonly _userAuthRepository: Repository<User>) {}

}
