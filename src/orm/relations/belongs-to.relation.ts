import { BelongsToOptions } from "../../options";
import { ModelClass } from "../../types";
import { Model } from "../model";
import { BaseRelation } from "./base.relation";

export class BelongsTo extends BaseRelation {
    options?: BelongsToOptions;

    constructor(target: typeof Model, relatedClass: ModelClass, options: BelongsToOptions = {}) {
        super(target, relatedClass);

        this.options = options;

        this.setForeignKey(options.foreignKey);
        this.setOwnerKey(options.ownerKey);
    }

    getRelation() {
        return {
            modelClass: this.relatedClass,
            relation: this.target.BelongsToOneRelation,
            join: {
                to: `${this.target.tableName}.${this.foreignKey}`,
                from: `${this.relatedClass().tableName}.${this.ownerKey}`
            }
        }
    }
}