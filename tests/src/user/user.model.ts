import { Model } from "../../../src/orm";

export class User extends Model {
    id: number;

    name: string;

    email: string;

    static get hiddenFields() {
        return ['password', 'remember_token']
    }
}