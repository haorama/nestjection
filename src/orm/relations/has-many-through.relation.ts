import { HasManyThroughOptions } from "../../options";
import { ModelClass } from "../../types";
import { toSnakeCase } from "../../utils";
import { Model } from "../model";
import { BaseRelation } from "./base.relation";

export class HasManyThroughRelation extends BaseRelation {
    through: string | typeof Model;

    firstKey?: string;

    secondKey?: string;

    options: HasManyThroughOptions;

    constructor(target: typeof Model, relatedClass: ModelClass, options: HasManyThroughOptions) {
        super(target, relatedClass);

        this.options = options;

        this.setOptions();
    }

    setOptions() {
        this.firstKey = this.options.firstKey ?? `${toSnakeCase(this.target.name)}_id`;
        this.secondKey = this.options.secondKey ?? `${toSnakeCase(this.relatedClass.name)}_id`;

        this.through = this.options.through;
    }

    getRelation() {
        let through = this.through;

        if (typeof through != 'string') {
            through = toSnakeCase(through.name)
        }

        return {
            modelClass: this.relatedClass,
            relation: this.target.ManyToManyRelation,
            join: {
                from: `${this.target.tableName}.id`,
                through: {
                    from: `${through}.${this.firstKey}`,
                    to: `${through}.${this.secondKey}`
                },
                to: `${this.relatedClass().tableName}.id`
            }
        }
    }
}