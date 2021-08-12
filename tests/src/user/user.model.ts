import { Model } from "../../../src/orm";
import { Otp } from "./otp.model";
import { HasOne } from '../../../src/decorators';

export class User extends Model {
    id: number;

    name: string;

    email: string;

    @HasOne(() => Otp)
    otp: Otp;

    static get hiddenFields() {
        return ['password', 'remember_token']
    }
}