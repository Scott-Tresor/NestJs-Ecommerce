import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/types/user';
import { Model } from 'mongoose';
import { RegisterDTO, LoginDTO } from '../../dist/auth/auth.dto';
import * as bcryt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>){}
    private sanitizeUser(user: User){
        return user.depopulate('password');
    }
    async create(userDTO: RegisterDTO){
        const {username} = userDTO;
        const user = await this.userModel.findOne({username});
        if (user) {
            throw new HttpException('User already exist',HttpStatus.BAD_REQUEST);
        }
        const creatUser = new this.userModel(userDTO);
        await creatUser.save();
        return this.sanitizeUser(creatUser);
    }

    async findBylogin(userDTO: LoginDTO){
        const {username, password} = userDTO;
        const user = await this.userModel.findOne({username});
        if (!user) {
            throw new HttpException('Invalid credentials',HttpStatus.UNAUTHORIZED);
        }

        if(await bcryt.compare(username, password)){
            return this.sanitizeUser(user);
        }else {
            throw new HttpException('Invalid credentials',HttpStatus.UNAUTHORIZED);
        }
    }
}
