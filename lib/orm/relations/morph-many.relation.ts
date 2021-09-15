import { HasManyRelation } from ".";
import { Model, QueryBuilder } from "..";
import { MorphManyOptions } from "../..";
import { ModelClass } from "../../types";

export class MorphManyRelation extends HasManyRelation {
    options: MorphManyOptions;

    type?: string;
    id?: string;

    constructor(target: Model, relatedClass: ModelClass, options: MorphManyOptions) {
        super(target, relatedClass, options);

        this.options = options;
    }

    setMorphAttribute() {
        this.type = this.options.type ?? `${this.options.morphName}_type`;
        this.id = this.options.id ?? `${this.options.morphName}_id`;
    }

    getRelation() {
        this.setMorphAttribute();

        const typeValue = this.options.typeValue || this.target.name;

        return {
            filter: (builder: QueryBuilder<any>) => {
                builder.where(this.type, typeValue);
            },
            beforeInsert(model: any) {
                model[this.type] = typeValue;
            },
            ...super.getRelation(),
            join: {
                ...super.getRelation().join,
                to: `${this.related.tableName}.${this.id}`
            }
        }
    }
}