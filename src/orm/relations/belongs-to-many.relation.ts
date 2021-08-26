import { BelongsToManyOptions } from "../../interfaces";
import { ModelClass } from "../../types";
import { toSnakeCase } from "../../utils";
import { Model } from "../model";
import { BaseRelation } from "./base.relation";

export class BelongsToManyRelation extends BaseRelation {
    pivotTable: string;

    throughFrom: string;

    throughTo: string;

    options: BelongsToManyOptions;

    constructor(target: Model, relatedClass: ModelClass, options: BelongsToManyOptions = {}) {
        super(target, relatedClass);

        this.options = options;
    }

    setOptions() {
        this.pivotTable = this.options.pivotTable ?? `${toSnakeCase(this.related.name)}_${toSnakeCase(this.target.name)}`
        this.throughFrom = this.options.throughFrom ?? `${toSnakeCase(this.target.name)}_id`;
        this.throughTo = this.options.throughTo ?? `${toSnakeCase(this.related.name)}_id`;
    }

    getRelation() {
        this.setOptions();

        return {
            modelClass: this.relatedClass,
            relation: Model.ManyToManyRelation,
            join: {
                from: `${this.target.tableName}.id`,
                through: {
                    from: `${this.pivotTable}.${this.throughFrom}`,
                    to: `${this.pivotTable}.${this.throughTo}`
                },
                to: `${this.related.tableName}.id`,
            },
        }
    }
}