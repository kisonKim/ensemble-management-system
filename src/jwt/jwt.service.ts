import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(private readonly config: ConfigService) {}

  sign(userId: number): string {
    return jwt.sign({ id: userId }, this.config.get('PRIVATE_KEY'));
  }

  verify(token: string) {
    return jwt.verify(token, this.config.get('PRIVATE_KEY'));
  }
}
