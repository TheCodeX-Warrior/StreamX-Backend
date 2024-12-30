import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../entities/user-auth.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserAuthService {
  constructor(
    private readonly _userAuthRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  //   authentication methods

  async generateAccessToken(id: string): Promise<string> {
    try {
      // Fetch the user by ID
      const user = await this._userAuthRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      // Define the payload for the JWT
      const payload = { ...user };

      // Sign and return the token
      return await this.jwtService.signAsync(payload, {
        expiresIn: '15m', // Access token valid for 15 minutes
      });
    } catch (error) {
      // Add meaningful error handling
      throw new Error(`Error generating access token: ${error.message}`);
    }
  }

  async generateRefreshToken(id: string): Promise<string> {
    try {
      const user = await this._userAuthRepository.findOne({ where: { id } });

      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }

      // Define the payload for the refresh token
      const payload = { id: user.id };

      // Optional: Define token options (e.g., expiration)
      const options = { expiresIn: '7d' }; // Refresh token valid for 7 days

      // Sign and return the refresh token
      return await this.jwtService.signAsync(payload, options);
    } catch (error) {
      throw new Error(`Error generating refresh token: ${error.message}`);
    }
  }
}
