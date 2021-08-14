import { BelongsToMany } from "../../../src/decorators";
import { Model } from "../../../src/orm";
import { User } from "../user/user.model";

export class Restaurant extends Model {
    id: number;

    @BelongsToMany(() => User)
    users: User[]
}