import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { LocalStrategy } from './local.strategi';
import { Role } from '../roles/entities/role.entity';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
config();
const configService = new ConfigService();
@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([User, Role]),
    JwtModule.register({
      secret: configService.get('JWT_SECRET', 'SimpleSecret'),
      signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN', '60s')}
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
