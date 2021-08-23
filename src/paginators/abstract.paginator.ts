import { Model as ObjectionModel } from "objection";
import { PaginationOptions } from "../interfaces";
import { Model } from "../orm";
import { objExcept } from "../utils";

export class AbstractPaginator<T extends ObjectionModel> {
    data: T[];

    total: number;

    perPage: number;

    currentPage: number;

    totalPerPage?: number;

    req: any;

    constructor(data: T[], total: number, options: PaginationOptions) {
        this.data = data;
        this.total = total;
        this.perPage = options.perPage;
        this.currentPage = options.page;
        this.totalPerPage = data.length;
    }

    get nextPage() {
        return this.currentPage < this.lastPage ? this.currentPage + 1 : null;
    }

    get lastPage() {
        return Math.max( Math.ceil(this.total / this.perPage), 1)
    }

    get prevPage() {
        return this.currentPage > 1 ? this.currentPage - 1 : null;
    }

    toResponse() {
        return {
            ...objExcept(this, ['req']),
            data: this.data.map(d => this.serialize(d)),
            nextPage: this.nextPage,
            prevPage: this.prevPage,
            lastPage: this.lastPage
        }
    }

    private serialize(data: any) {
        if (data instanceof Model) {
            return data.serialize();
        }

        return data;
    }
}