import { BelongsToOptions } from "../../interfaces";
import { ModelClass } from "../../types";
import { Model } from "../model";
import { BaseRelation } from "./base.relation";

export class BelongsToRelation extends BaseRelation {
    options?: BelongsToOptions;

    constructor(target: Model, relatedClass: ModelClass, options: BelongsToOptions = {}) {
        super(target, relatedClass);
        this.inverse = true;

        this.options = options;
    }

    getRelation() {
        this.setForeignKey(this.options.foreignKey);
        this.setOwnerKey(this.options.ownerKey);

        return this.mergeRelation({
            modelClass: this.relatedClass,
            relation: Model.BelongsToOneRelation,
            join: {
                to: `${this.target.tableName}.${this.foreignKey}`,
                from: `${this.related.tableName}.${this.ownerKey}`,
            }
        })
    }
}