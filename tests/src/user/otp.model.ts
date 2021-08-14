import { BelongsTo } from "../../../src/decorators";
import { Model } from "../../../src/orm";
import { User } from "./user.model";

export class Otp extends Model {
    static get tableName() {
        return 'user_otps';
    }

    id: number;

    @BelongsTo(() => User)
    user: User

    static get hiddenFields() {
        return ['code']
    }
}