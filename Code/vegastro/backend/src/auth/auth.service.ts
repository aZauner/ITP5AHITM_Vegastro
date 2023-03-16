import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserDetails } from '../user/entities/user.entity';
import { ExistingUserDto } from '../user/dto/existing-user.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) { }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12)
  }

  async register(user: Readonly<CreateUserDto>): Promise<UserDetails | any> {
    const { firstname, lastname, username, email, password } = user;

    const existingUser = await this.userService.findByMail(email);
    if (existingUser) return new HttpException('User exists already', HttpStatus.NOT_FOUND)

    const hashedPassword = await this.hashPassword(password);

    const newUser = await this.userService.create(firstname, lastname, username, email, hashedPassword);

    const user1 = this.userService._getUserDetails(newUser)
    const jwt = await this.jwtService.signAsync({ user1 })

    this.userService.addToken(user1.id, jwt);
    return { token: jwt }
  }

  async login(existingUser: ExistingUserDto): Promise<{ token: string } | any> {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password)

    if (!user) return new HttpException('wrong password', HttpStatus.NOT_FOUND);


    return { token: user.token };

  }
  async passwordMatch(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async changeData(token: string, oldPassword: string, newPassword: string, confirmedPassword: string, firstname: string, lastname: string, username:string): Promise<HttpStatus | HttpException> {
    const user = await this.userService.findByToken(token);

    const userExist = !!user;

    if (!userExist) return new HttpException('Benutzer nicht gefunden', HttpStatus.BAD_REQUEST)

    const newHash = await this.hashPassword(newPassword);
   
    

    const doespasswordMatch = await this.passwordMatch(oldPassword, user.password)
    if (!doespasswordMatch) return new HttpException('Altes Passwort stimmt nicht überein!', HttpStatus.BAD_REQUEST)
    if(oldPassword == newPassword) return new HttpException('Neues und altes Passwort sind gleich!', HttpStatus.BAD_REQUEST)
    if (newPassword != confirmedPassword) return new HttpException('Neues Passwort stimmt nicht überein!', HttpStatus.BAD_REQUEST);
   
   

    const newUser = await this.userService.changeUserDataPwd({
      token: token,
      password: newHash,
      firstname : firstname,
      lastname: lastname,
      username: username
    });
  }

  async validateUser(email: string, password: string): Promise<UserDetails | null> {
    const user = await this.userService.findByMail(email);
    const userExist = !!user;

    if (!userExist) return null;
    
    const doespasswordMatch = await this.passwordMatch(password, user.password)
    
    if (!doespasswordMatch) return null;

    return this.userService._getUserDetails(user);
  }

}