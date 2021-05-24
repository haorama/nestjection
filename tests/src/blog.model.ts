import { HasMany, Model, BelongsTo } from "../../src";
import { User } from "./user.model";
import { Comment } from "./comment.model";

export class Blog extends Model {
    id: number;

    user_id: number;

    title: string;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => Comment)
    comments: Comment[];
}