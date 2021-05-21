import { Model } from "@/models";

export class User extends Model {
    name: string;

    email: string;

    password: string;
}