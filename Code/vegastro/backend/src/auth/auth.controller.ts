import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpStatus, HttpException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ExistingUserDto } from 'src/user/dto/existing-user.dto';
import { UserDetails } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() user: CreateUserDto): Promise<UserDetails | null> {
    console.log(user)
    return this.authService.register(user);
  }

  @Post('login')
  login(@Body() user: ExistingUserDto): Promise<{token: string} | null> {
    return this.authService.login(user);
  }
  
  @Put('changeData')
  changeData(@Body() input : {token: string, oldPassword: string, newPassword: string, confirmedPassword: string, firstname: string, lastname: string, username:string}): Promise<HttpStatus | HttpException> {
    return this.authService.changeData(input.token,input.oldPassword, input.newPassword, input.confirmedPassword ,input.firstname, input.lastname, input.username )
  }
  

}
