import { Model } from "objection";
import { PaginationOptions } from "../interfaces";
import { AbstractPaginator } from "./abstract.paginator";

export class SimplePaginator<T extends Model = any> extends AbstractPaginator<T> {
    constructor(data: T[], total: number, options: PaginationOptions) {
        super(data, total, options);
    }
}