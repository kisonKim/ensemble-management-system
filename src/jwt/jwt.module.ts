import { DynamicModule, Global, Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from './jwt.service';

@Module({})
@Global()
export class JwtModule {
  static forRoot(): DynamicModule {
    return {
      module: JwtModule,
      providers: [JwtService],
      exports: [JwtService],
    };
  }
}
