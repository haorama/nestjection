import { Model } from "../../src";
import { User } from "./user.model";
import { Comment } from "./comment.model";

export class Blog extends Model {
    id: number;

    user_id: number;

    title: string;

    user: User;

    comments: Comment[];

    static get relationMappings() {
        return {
            user: this.relation.belongsTo(User)
        }
    }
}