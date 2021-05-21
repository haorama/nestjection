import { Model } from "@/orm";

export class User extends Model {
    name: string;

    email: string;

    password: string;
}