import { Model } from "../../../src";

export class User extends Model {
    id: number;

    name: string;

    password: string;
}