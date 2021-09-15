import { BelongsToManyRelation } from ".";
import { QueryBuilder } from "..";
import { MorphToManyOptions } from "../../interfaces/relations/morph-to-many.options";
import { ModelClass } from "../../types";
import { Model } from "../model";

export class MorphToManyRelation extends BelongsToManyRelation {
    options: MorphToManyOptions;

    type: string;
    id: string;

    from: string;
    to: string;

    constructor(target: Model, related: ModelClass, options?: MorphToManyOptions) {
        super(target, related);

        this.options = options;
    }

    setMorphAttribute() {
        this.type = this.options.type ?? `${this.options.morphName}_type`;
        this.id = this.options.id ?? `${this.options.morphName}_id`;
        this.table = this.options.table ?? `${this.options.morphName}s`;

        this.from = this.options.from ?? 'id';

        this.to = this.options.to ?? 'id';
    }

    getRelation() {
        const superRelation = super.getRelation();

        this.setMorphAttribute();

        const typeValue = this.options.typeValue || this.target.name;

        const relation = {
            ...superRelation,
            filter: (builder: QueryBuilder<any>) => {
                builder.where(this.type, typeValue);
            },
            beforeInsert: (model: any) => {
                model[this.type] = typeValue;
            },
            join: {
                from: `${this.target.tableName}.${this.from}`,
                to: `${this.related.tableName}.${this.to}`,
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