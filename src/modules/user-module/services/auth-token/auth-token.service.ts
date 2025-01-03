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

    tokenType: string,
    deviceId: string,
    tokenDuration: number,
  ): Promise<string> {
    try {
      const currentTimeStamp = Date.now();
      const token = await this.jwtService.signAsync(payload, {
        secret: String(
          process.env.secretKey + 'tim-' + currentTimeStamp + 'dev-' + deviceId,
        ),
      });

      if (tokenType == TOKEN_TYPE_CONSTANT.REFRESH_TOKEN) {
        await this._authTokenRepository.create({
          token,
          deviceId,
          userId: payload.userId,
          generatedTimestamp: currentTimeStamp,
          tokenDuration,
        });
        return token;
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
