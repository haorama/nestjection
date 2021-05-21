import { PaginationOptions } from "@/options";
import { Model } from "objection";

export class AbstractPaginator<T extends Model> {
    data: T[];

    total: number;

    perPage: number;

    currentPage: number;

    nextPage: number;

    prevPage: number;

    constructor(data: T[], total: number, options: PaginationOptions) {
        this.data = data;
        this.total = total;
        this.perPage = options.perPage;
        this.currentPage = options.page;
    }
}