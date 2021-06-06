import { BelongsToManyOptions } from "../../options";
import { toSnakeCase } from "../../utils";
import { Model } from "../model";
import { BaseRelation } from "./base.relation";

export class BelongsToManyRelation extends BaseRelation {
    relatedTable: string;

    foreignPivotKey: string;

    relatedPivotKey: string;

    options: BelongsToManyOptions;

    constructor(target: typeof Model, relatedClass: typeof Model, options: BelongsToManyOptions = {}) {
        super(target, relatedClass);

        this.options = options;

        this.setOptions();
    }

    getRelation() {
        return {
            modelClass: this.relatedClass,
            relation: this.target.ManyToManyRelation,
            join: {
                from: `${this.target.tableName}.id`,
                through: {
                    from: `${this.relatedTable}.${this.foreignPivotKey}`,
                    to: `${this.relatedTable}.${this.relatedPivotKey}`
                },
                to: `${this.relatedClass.tableName}.id`
            },
        }
    }

    setOptions() {
        this.relatedTable = this.options.relatedTable ?? `${toSnakeCase(this.relatedClass.name)}_${toSnakeCase(this.target.name)}`
        this.foreignPivotKey = this.options.foreignPivotKey ?? `${toSnakeCase(this.target.name)}_id`;
        this.relatedPivotKey = this.options.relatedPivotKey ?? `${toSnakeCase(this.relatedClass.name)}_id`;
    }
}