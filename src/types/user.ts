import { Document } from 'mongoose';

interface Adress {
    addr1: string;
    addr2: string;
    city: string;
    state: string;
    country: string;
    zip: number;
}

export interface User extends Document{
    name: string;
    readonly password: string;
    seller: boolean;
    adress: Adress;
    created: Date;
}