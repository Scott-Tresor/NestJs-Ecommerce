import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../shared/user.service';
import { RegisterDTO, LoginDTO } from '../../dist/auth/auth.dto';


@Controller('auth')
export class AuthController {
    constructor(private userService: UserService){}

    @Post('login')
    async login(@Body() userDTO: LoginDTO){
        return await this.userService.findBylogin(userDTO);
    }

    @Post('register')
    async register(@Body() userDTO: RegisterDTO){
        return await this.userService.create(userDTO);
    }
}
