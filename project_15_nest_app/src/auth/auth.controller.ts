import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto'
import { UsersService } from '../users/users.service';

@Controller('v1.0/auth')
export class AuthController {

  constructor(
    private usersService: UsersService,
    private authService: AuthService) {
  }
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Request() req: any) {
    return this.authService.login(req.user); // TODO ...
  }

  @Post('signup')
  async signUn(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }
}
