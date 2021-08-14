import { HasOneOptions } from "../../options";
import { ModelClass } from "../../types";
import { Model } from "../model";
import { BaseRelation } from "./base.relation";

export class HasOneRelation extends BaseRelation {
    options?: HasOneOptions;

    constructor(target: Model, relatedClass: ModelClass, options: HasOneOptions = {}) {
        super(target, relatedClass);

        this.options = options;
    }

    getRelation() {
        this.setForeignKey(this.options.foreignKey);
        this.setLocalKey(this.options.localKey);

        return {
            modelClass: this.relatedClass,
            relation: Model.HasOneRelation,
            join: {
                from: `${this.target.tableName}.${this.localKey}`,
                to: `${this.related.tableName}.${this.foreignKey}`,
            }
        }
    }
}