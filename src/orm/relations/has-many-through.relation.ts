import { HasManyThroughOptions } from "../../interfaces";
import { ModelClass } from "../../types";
import { toSnakeCase } from "../../utils";
import { Model } from "../model";
import { BaseRelation } from "./base.relation";

export class HasManyThroughRelation extends BaseRelation {
    through: string | typeof Model;

    from?: string;

    to?: string;

    throughFrom?: string;

    throughTo?: string;

    options: HasManyThroughOptions;

    constructor(target: Model, relatedClass: ModelClass, options: HasManyThroughOptions) {
        super(target, relatedClass);

        this.options = options;
    }

    setOptions() {
        this.throughFrom = this.options.throughFrom ?? `${toSnakeCase(this.target.name)}_id`;
        this.throughTo = this.options.throughTo ?? 'id';

        this.from = this.options.from ?? 'id';

        this.through = this.options.through;

        if (typeof this.through != 'string' && !this.to) {
            this.to = toSnakeCase(this.through.name) + '_id';
        }
    }

    getRelation() {
        this.setOptions();

        let through = this.through;

        if (typeof through != 'string') {
            through = through.tableName;
        }

        return {
            modelClass: this.relatedClass,
            relation: Model.ManyToManyRelation,
            join: {
                from: `${this.target.tableName}.${this.from}`,
                to: `${this.related.tableName}.${this.to}`,
                through: {
                    from: `${through}.${this.throughFrom}`,
                    to: `${through}.${this.throughTo}`
                },
            }
        }
    }
}