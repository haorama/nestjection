import { Model } from "../../../src/orm";
import { Otp } from "./otp.model";
import { HasOne } from '../../../src/decorators';
import { Relation } from "../../../src/storages/relation.storage";

export class User extends Model {
    id: number;

    name: string;

    email: string;

    @HasOne(() => Otp)
    @Relation(() => Otp)
    otp: Otp;

    static get hiddenFields() {
        return ['password', 'remember_token']
    }
}