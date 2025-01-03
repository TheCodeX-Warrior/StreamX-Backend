import { Controller, Post, Body } from '@nestjs/common';
import { AuthTokenService } from '../../services/auth-token/auth-token.service';
import { GenerateTokenDto } from '../../dtos/token.dto';

@Controller('auth-token')
export class AuthTokenController {
  constructor(private readonly authTokenService: AuthTokenService) {}

  @Post('generate')
  async generateToken(@Body() body: GenerateTokenDto) {
    const { tokenType, deviceId, user, tokenDuration } = body;

    try {
      const payload = { ...user };
      const token = await this.authTokenService.generateToken(
        payload,

        tokenType,
        deviceId,
        tokenDuration,
      );
      return { token };
    } catch (error) {
      throw error;
    }
  }
}
