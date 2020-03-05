import { Injectable } from '@nestjs/common';
import { User } from 'src/types/user';
import { Model } from 'mongoose';
@Injectable()
export class UserService {
    constructor(private userModel: Model<User>){}
}
