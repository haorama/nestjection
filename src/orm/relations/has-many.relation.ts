import { HasManyOptions } from "../../options";
import { ModelClass } from "../../types";
import { Model } from "../model";
import { BaseRelation } from "./base.relation";

export class HasManyRelation extends BaseRelation {
    options?: HasManyOptions;

    constructor(target: Model, relatedClass: ModelClass, options: HasManyOptions = {}) {
        super(target, relatedClass);

        this.options = options;

        this.setForeignKey(options.foreignKey);
        this.setLocalKey(options.localKey)
    }

    getRelation() {
        return {
            modelClass: this.relatedClass,
            relation: Model.HasManyRelation,
            join: {
                // from: `${this.target.tableName}.${this.localKey}`,
                from: '',
                // to: `${this.relatedClass().tableName}.${this.foreignKey}`,
                to: ''
            }
        }
    }
}