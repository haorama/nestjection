import { BelongsToOptions } from "../../options";
import { ModelClass } from "../../types";
import { Model } from "../model";
import { BaseRelation } from "./base.relation";

export class BelongsToRelation extends BaseRelation {
    options?: BelongsToOptions;

    constructor(target: Model, relatedClass: ModelClass, options: BelongsToOptions = {}) {
        super(target, relatedClass);

        this.options = options;

        this.setForeignKey(options.foreignKey);
        this.setOwnerKey(options.ownerKey);
    }

    getRelation() {
        return {
            modelClass: this.relatedClass,
            relation: Model.BelongsToOneRelation,
            join: {
                // to: `${this.target.tableName}.${this.foreignKey}`,
                to: 'd',
                // from: `${this.relatedClass().tableName}.${this.ownerKey}`,
                from: 'a'
            }
        }
    }
}