import { Document } from 'mongoose';
import { User } from './user';
import { Product } from './product';
export interface Product extends Document{
    owner: User;
    totalPrice: number;
    products: Product[];
}