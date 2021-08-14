import { HasOneOptions } from "../../options";
import { ModelClass } from "../../types";
import { toSnakeCase } from "../../utils";
import { Model } from "../model";
import { BaseRelation } from "./base.relation";

export class HasOneRelation extends BaseRelation {
    options?: HasOneOptions;

    constructor(target: Model, relatedClass: ModelClass, options: HasOneOptions = {}) {
        super(target, relatedClass);

        this.options = options;

        this.setForeignKey(options.foreignKey);
        this.setLocalKey(options.localKey);
    }

    getRelation() {
        return {
            modelClass: this.relatedClass,
            relation: Model.HasOneRelation,
            join: {
                // from: `${this.target.tableName}.${this.localKey}`,
                from :'id',
                // to: `${this.relatedClass().tableName}.${this.foreignKey}`,
                to: 'a'
            }
        }
    }

    setForeignKey(key?: string) {
        // this.foreignKey = key ?? `${toSnakeCase(this.target.name)}_id`
    }
}