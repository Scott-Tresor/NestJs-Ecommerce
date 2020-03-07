import * as mongoose from 'mongoose';
import * as bcryt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    seller: {
        type: Boolean,
        default: false
    },
    adress: {
        addr1: String,
        addr2: String,
        city: String,
        state: String,
        country: String,
        zip: Number,
    },
    created: {
        type: Date,
        default: Date.now(),
    }
});

UserSchema.pre('save', async (next: mongoose.HookNextFunction)=>{
    try{
        if(!this.isModified('password')){
            return next();
        }
        const hashed = await bcryt.hash(this['password'], 20);
    }
});