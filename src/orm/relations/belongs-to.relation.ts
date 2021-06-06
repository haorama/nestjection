import { Model } from "objection";
import { BelongsToOptions } from "../../options";
import { toSnakeCase } from "../../utils";
import { BaseRelation } from "./base.relation";

export class BelongsTo extends BaseRelation {
    options: BelongsToOptions;

    foreignKey: string;
    ownerKey: string;

    constructor(target: typeof Model, relatedClass: typeof Model, options: BelongsToOptions) {
        super(target, relatedClass);

        this.options = options;

        this.setOptions();
    }

    getRelation() {
        return {
            modelClass: this.relatedClass,
            relation: this.target.BelongsToOneRelation,
            join: {
                to: `${this.target.tableName}.${this.foreignKey}`,
                from: `${this.relatedClass.tableName}.${this.ownerKey}`
            }
        }
    }

    setOptions() {
        this.foreignKey = this.options.foreignKey ?? `${toSnakeCase(this.relatedClass.name)}_id`;
        this.ownerKey = this.options.ownerKey ?? 'id';
    }
}