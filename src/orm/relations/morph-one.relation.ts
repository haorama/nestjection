import { MorphOneOptions } from "../../options/relations/morph-one.options";
import { ModelClass } from "../../types";
import { Model } from "../model";
import { QueryBuilder } from "../query-builder";
import { HasOneRelation } from "./has-one.relation";

export class MorphOneRelation extends HasOneRelation {
    options: MorphOneOptions;

    type?: string;
    id?: string;

    constructor(target: Model, relatedClass: ModelClass, options: MorphOneOptions) {
        super(target, relatedClass, options);

        this.options = options;
    }

    setMorphAttribute() {
        this.type = this.options.type ?? `${this.options.morphName}_type`;
        this.id = this.options.id ?? `${this.options.morphName}_id`;
    }

    getRelation() {
        this.setMorphAttribute();

        return {
            ...super.getRelation(),
            filter: (builder: QueryBuilder<any>) => {
                const typeValue = this.options.typeValue || this.target.name;

                builder.where(this.type, typeValue);
            },
            join: {
                ...super.getRelation().join,
                to: `${this.related.tableName}.${this.id}`,
            }
        }
    }
}