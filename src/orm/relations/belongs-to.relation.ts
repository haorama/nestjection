import { BelongsToOptions } from "../../options";
import { ModelClass } from "../../types";
import { Model } from "../model";
import { BaseRelation } from "./base.relation";

export class BelongsToRelation extends BaseRelation {
    options?: BelongsToOptions;

    constructor(target: Model, relatedClass: ModelClass, options: BelongsToOptions = {}) {
        super(target, relatedClass);

        this.options = options;
    }

    getRelation() {
        this.setForeignKey(this.options.foreignKey);
        this.setOwnerKey(this.options.ownerKey);

        return {
            modelClass: this.relatedClass,
            relation: Model.BelongsToOneRelation,
            join: {
                to: `${this.getTarget.tableName}.${this.foreignKey}`,
                from: `${this.getRelated.tableName}.${this.ownerKey}`,
            }
        }
    }
}