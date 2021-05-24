import { Model } from "../../src";

export class User extends Model {
    static get hiddenFields() {
        return ['password']
    }

    id: number;

    name: string;

    password: string;
}