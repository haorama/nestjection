import { HasOne } from "./decorators";
import { Model } from "./orm";

export class Blog extends Model {
    id: number;

    user_id: number;
}

export class User extends Model {
    id: number;

    name: string;

    @HasOne(() => Blog)
    blog: Blog;
}