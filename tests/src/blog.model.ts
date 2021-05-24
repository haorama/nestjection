import { HasMany, Model } from "../../src";
import { User } from "./user.model";
import { BelongsTo } from '../../src';
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