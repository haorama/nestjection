import { Model } from "../../../src/orm";
import { HasMany, HasOne, BelongsToMany } from '../../../src/decorators';
import { Otp } from "./otp.model";
import { Order } from "./order.model";
import { Restaurant } from "./restaurant.model";

export class User extends Model {
    id: number;

    name: string;

    email: string;

    @HasOne(() => Otp)
    otp: Otp;

    @HasMany(() => Order)
    orders: Order

    @BelongsToMany(() => Restaurant)
    restaurants: Restaurant[]

    static get hiddenFields() {
        return ['password', 'remember_token']
    }
}