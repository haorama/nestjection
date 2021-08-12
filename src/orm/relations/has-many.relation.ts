import { HasManyOptions } from "../../options";
import { ModelClass } from "../../types";
import { Model } from "../model";
import { BaseRelation } from "./base.relation";

export class HasManyRelation extends BaseRelation {
    options?: HasManyOptions;

    constructor(target: typeof Model, relatedClass: ModelClass, options: HasManyOptions = {}) {
        super(target, relatedClass);

        this.options = options;

        this.setForeignKey(options.foreignKey);
        this.setLocalKey(options.localKey)
    }

    getRelation() {
        return {
            modelClass: this.relatedClass,
            relation: this.target.HasManyRelation,
            join: {
                from: `${this.target.tableName}.${this.localKey}`,
                to: `${this.relatedClass().tableName}.${this.foreignKey}`
            }
        }
    }
}