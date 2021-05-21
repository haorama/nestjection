import { PaginationOptions } from "@/options";
import {Model} from "objection";

export class SimplePaginator<T extends Model = any> {
    data: T[];

    total: number;

    perPage: number;

    page: number;

    nextPage: number;

    prevPage: number;

    constructor(data: T[], total: number, options: PaginationOptions) {
        this.data = data;
        this.total = total;
        this.perPage = options.perPage;
        this.page = options.page;
    }
}