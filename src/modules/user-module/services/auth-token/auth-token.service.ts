import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { AuthToken } from '../../entities/auth-token.entity';

export const TOKEN_TYPE_CONSTANT = {
  ACCESS_TOKEN: 'access-token',
  REFRESH_TOKEN: 'refresh-token',
};

@Injectable()
export class AuthTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly _authTokenRepository: Repository<AuthToken>,
  ) {}

  async generateToken(
    payload: any,
    secretKey: string,
    tokenType: string,
    deviceId: string,
  ): Promise<string> {
    try {
      const token = await this.jwtService.signAsync(payload, {
        secret: secretKey,
      });

      if (tokenType == TOKEN_TYPE_CONSTANT.REFRESH_TOKEN) {
      } else if (tokenType == TOKEN_TYPE_CONSTANT.ACCESS_TOKEN) {
        return token;
      }
    } catch (error) {
      throw error;
    }
  }
  async verifyToken(token: string, secretKey: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token, { secret: secretKey });
    } catch (error) {
      throw error;
    }
  }
}
