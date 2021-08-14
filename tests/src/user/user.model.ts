import { Model } from "../../../src/orm";
import { Otp } from "./otp.model";
import { HasMany, HasOne, BelongsToMany } from '../../../src/decorators';
import { Order } from "../order/order.model";
import { Restaurant } from "../restaurant/restaurant.model";

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