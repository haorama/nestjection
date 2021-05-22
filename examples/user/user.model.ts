import { Exclude } from "class-transformer";
import { Model } from "src";

export class User extends Model {
    name: string;

    email: string;

    @Exclude({toPlainOnly: true})
    password: string;
}