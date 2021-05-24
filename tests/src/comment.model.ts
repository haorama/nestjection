import { Model } from "../../src";
import { Blog } from "./blog.model";

export class Comment extends Model {
    id: number;

    static get hiddenFields() {
        return ['blog_id']
    }

    blog_id: number;

    blog: Blog;

    body: string;
}