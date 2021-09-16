import { QueryBuilder } from "..";
import { MorphToManyOptions } from "../..";
import { Relation } from "./relation";

export class MorphToManyRelation extends Relation<MorphToManyOptions> {
    table: string;

    type: string;
    id: string;

    prepareOptions() {
        this.type = this.options.type ?? `${this.options.morphName}_type`;
        this.id = this.options.id ?? `${this.options.morphName}_id`;
        this.table = this.options.table ?? this.getPluralKey(this.options.morphName);
    }

    getRelation() {
        const typeValue = this.options.typeValue || this.target.name;

        return this.createRelation({
            relation: this.target.ManyToManyRelation,
            filter: (builder: QueryBuilder<any>) => {
                builder.where(this.type, typeValue);
            },
            beforeInsert: (model: any) => {
                model[this.type] = typeValue;
            },
            join: {
                from: this.joinFrom,
                to: this.joinTo,
                through: this.joinThrough
            }
        })
    }

    get joinTo() {
        return `${this.related.tableName}.id`
    }

    get joinThrough() {
        const toKey = `${this.getSingularKey(this.related.name)}_id`;

        return {
            from: `${this.table}.${this.id}`,
            to: `${this.table}.${toKey}`,
            extra: [this.type]
        }
    }
}