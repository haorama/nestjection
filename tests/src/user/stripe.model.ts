import { Model } from "../../../src/orm";

export class Stripe extends Model {
    static get tableName() {
        return 'stripe_accounts'
    }

    id: number;

    type: string;

    account_id: string
}