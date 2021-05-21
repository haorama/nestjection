import { Model } from "@/orm";
import { Exclude } from "class-transformer";

export class User extends Model {
    name: string;

    email: string;

    @Exclude({toPlainOnly: true})
    password: string;
}