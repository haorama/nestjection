import { BelongsToManyRelation } from ".";
import { QueryBuilder } from "..";
import { MorphToManyOptions } from "../../interfaces/relations/morph-to-many.options";
import { ModelClass } from "../../types";
import { Model } from "../model";

export class MorphToManyRelation extends BelongsToManyRelation {
    options: MorphToManyOptions;

    type: string;
    id: string;

    constructor(target: Model, related: ModelClass, options?: MorphToManyOptions) {
        super(target, related);

        this.options = options;
    }

    setMorphAttribute() {
        this.type = this.options.type ?? `${this.options.morphName}_type`;
        this.id = this.options.id ?? `${this.options.morphName}_id`;
        this.table = this.options.table ?? `${this.options.morphName}s`;
    }

    getRelation() {
        this.setMorphAttribute();

        const typeValue = this.options.typeValue || this.target.name;

        const relation = {
            ...super.getRelation(),
            filter: (builder: QueryBuilder<any>) => {
                builder.where(this.type, typeValue);
            },
            beforeInsert: (model: any) => {
                model[this.type] = typeValue;
            },
            join: {
                ...super.getRelation().join,
                to: `${this.related.tableName}.${this.id}`,
                through: {
                    from: `${this.table}.${this.relatedFK}`,
                    to: `${this.table}.${this.id}`,
                    extra: [this.type]
                }
            }
        }

        return relation;
    }
}