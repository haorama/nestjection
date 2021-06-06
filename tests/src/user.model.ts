import { HasOne, Model } from "../../src";
import { Blog } from "./blog.model";

export class User extends Model {
    static get hiddenFields() {
        return ['password']
    }

    id: number;

    name: string;

    password: string;

    @HasOne(() => Blog)
    blog: Blog;
}