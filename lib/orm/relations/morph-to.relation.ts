import { MorphToOptions } from "../../interfaces/relations/morph-to.options";
import { Relation } from "./relation";

export class MorphToRelation extends Relation<MorphToOptions> {
    type: string;
    id: string;
    protected inverse = true;

    prepareOptions() {
        this.type = this.options.type ?? `${this.options.morphName}_type`;
        this.id = this.options.id ?? `${this.options.morphName}_id`;
    }

    getRelation() {
        return this.createRelation({
            relation: this.target.BelongsToOneRelation,
            join: {
                from: this.joinFrom,
                to: this.joinTo,
            },
            beforeInsert: (model) => {
                model[this.type] = this.related.name
            }
        })
    }

    get joinFrom() {
        return `${this.target.tableName}.${this.id}`
    }
}