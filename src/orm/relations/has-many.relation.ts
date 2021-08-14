import { HasManyOptions } from "../../options";
import { ModelClass } from "../../types";
import { Model } from "../model";
import { BaseRelation } from "./base.relation";

export class HasManyRelation extends BaseRelation {
    options?: HasManyOptions;

    constructor(target: Model, relatedClass: ModelClass, options: HasManyOptions = {}) {
        super(target, relatedClass);

        this.options = options;
    }

    getRelation() {
        this.setForeignKey(this.options.foreignKey);
        this.setLocalKey(this.options.localKey)

        return {
            modelClass: this.relatedClass,
            relation: Model.HasManyRelation,
            join: {
                from: `${this.getTarget.tableName}.${this.localKey}`,
                to: `${this.getRelated.tableName}.${this.foreignKey}`,
            }
        }
    }
}