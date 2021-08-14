import { BelongsToMany, MorphOne } from "../../../src/decorators";
import { Model } from "../../../src/orm";
import { Stripe } from "./stripe.model";
import { User } from "./user.model";

export class Restaurant extends Model {
    id: number;

    @BelongsToMany(() => User)
    users: User[]

    @MorphOne(() => Stripe, {
        morphName: 'stripeable',
        typeValue: 'App\\Restaurant'
    })
    stripe: Stripe;
}