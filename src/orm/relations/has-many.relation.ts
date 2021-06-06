import { HasManyOptions } from "../../options";
import { toSnakeCase } from "../../utils";
import { Model } from "../model";
import { BaseRelation } from "./base.relation";

export class HasManyRelation extends BaseRelation {
    foreignKey: string;

    localKey: string;

    options: HasManyOptions;

    constructor(target: typeof Model, relatedClass: typeof Model, options: HasManyOptions = {}) {
        super(target, relatedClass);

        this.options = options;
        this.setOptions();
    }

    getRelation() {
        return {
            modelClass: this.relatedClass,
            relation: this.target.HasManyRelation,
            join: {
                from: `${this.target.tableName}.${this.localKey}`,
                to: `${this.relatedClass.tableName}.${this.foreignKey}`
            }
        }
    }

    setOptions() {
        this.foreignKey = this.options.foreignKey ?? `${toSnakeCase(this.target.name)}_id`;
        this.localKey = this.options.localKey ?? 'id';
    }
}