import { Model } from "../../../src/orm";
import { Otp } from "./otp.model";
import { HasMany, HasOne } from '../../../src/decorators';
import { Order } from "../order/order.model";

export class User extends Model {
    id: number;

    name: string;

    email: string;

    @HasOne(() => Otp)
    otp: Otp;

    @HasMany(() => Order)
    orders: Order

    static get hiddenFields() {
        return ['password', 'remember_token']
    }
}