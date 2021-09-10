import { BelongsToManyOptions } from "../../interfaces";
import { ModelClass } from "../../types";
import { toSnakeCase } from "../../utils";
import { Model } from "../model";
import { BaseRelation } from "./base.relation";

export class BelongsToManyRelation extends BaseRelation {
    table: string;

    parentFK: string;

    relatedFK: string;

    options: BelongsToManyOptions;

    constructor(target: Model, relatedClass: ModelClass, options: BelongsToManyOptions = {}) {
        super(target, relatedClass);

        this.options = options;
    }

    setOptions() {
        this.table = this.options.table ?? `${toSnakeCase(this.related.name)}_${toSnakeCase(this.target.name)}`
        this.parentFK = this.options.parentFK ?? `${toSnakeCase(this.target.name)}_id`;
        this.relatedFK = this.options.relatedFK ?? `${toSnakeCase(this.related.name)}_id`;
    }

    getRelation() {
        this.setOptions();

        return this.mergeRelation({
            modelClass: this.relatedClass,
            relation: Model.ManyToManyRelation,
            join: {
                from: `${this.target.tableName}.id`,
                through: {
                    from: `${this.table}.${this.parentFK}`,
                    to: `${this.table}.${this.relatedFK}`
                },
                to: `${this.related.tableName}.id`,
            },
        })
    }
}