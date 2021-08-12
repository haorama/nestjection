import { Model } from "../../../src/orm";

export class Otp extends Model {
    static get tableName() {
        return 'user_otps';
    }

    id: number;
}