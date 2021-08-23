import { BelongsToManyOptions } from "../../interfaces";
import { ModelClass } from "../../types";
import { toSnakeCase } from "../../utils";
import { Model } from "../model";
import { BaseRelation } from "./base.relation";

export class BelongsToManyRelation extends BaseRelation {
    relatedTable: string;

    foreignPivotKey: string;

    relatedPivotKey: string;

    options: BelongsToManyOptions;

    constructor(target: Model, relatedClass: ModelClass, options: BelongsToManyOptions = {}) {
        super(target, relatedClass);

        this.options = options;
    }

    getRelation() {
        this.setOptions();

        return {
            modelClass: this.relatedClass,
            relation: Model.ManyToManyRelation,
            join: {
                from: `${this.target.tableName}.id`,
                through: {
                    from: `${this.relatedTable}.${this.foreignPivotKey}`,
                    to: `${this.relatedTable}.${this.relatedPivotKey}`
                },
                to: `${this.related.tableName}.id`,
            },
        }
    }

    setOptions() {
        this.relatedTable = this.options.relatedTable ?? `${toSnakeCase(this.related.name)}_${toSnakeCase(this.target.name)}`
        this.foreignPivotKey = this.options.foreignPivotKey ?? `${toSnakeCase(this.target.name)}_id`;
        this.relatedPivotKey = this.options.relatedPivotKey ?? `${toSnakeCase(this.related.name)}_id`;
    }
}