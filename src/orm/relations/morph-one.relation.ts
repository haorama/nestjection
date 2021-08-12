import { MorphOneOptions } from "../../options/relations/morph-one.options";
import { ModelClass } from "../../types";
import { Model } from "../model";
import { QueryBuilder } from "../query-builder";
import { HasOneRelation } from "./has-one.relation";

export class MorphOneRelation extends HasOneRelation {
    morphName: string;
    type?: string;
    id?: string;

    options: MorphOneOptions;

    constructor(target: typeof Model, relatedClass: ModelClass, options: MorphOneOptions) {
        super(target, relatedClass, options);

        this.options = options;

        this.setMorphAttribute();
    }

    setMorphAttribute() {
        this.type = this.options.type ?? `${this.morphName}_type`;
        this.id = this.options.id ?? `${this.morphName}_id`;
    }

    getRelation() {
        return {
            ...super.getRelation(),
            filter: (builder: QueryBuilder<any>) => {
                builder.where(this.type, this.target.name);
            },
            join: {
                ...super.getRelation().join,
                to: `${this.relatedClass().tableName}.${this.id}`
            }
        }
    }
}