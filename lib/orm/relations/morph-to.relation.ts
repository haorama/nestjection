import { MorphToOptions } from "../../interfaces/relations/morph-to.options";
import { ModelClass } from "../../types";
import { Model } from "../model";
import { BelongsToRelation } from "./belongs-to.relation";

export class MorphToRelation extends BelongsToRelation {
    options: MorphToOptions;

    type: string;
    id: string;

    constructor(target: Model, related: ModelClass, options?: MorphToOptions) {
        super(target, related);

        this.options = options;
    }

    setMorphAttribute() {
        this.type = this.options.type ?? `${this.options.morphName}_type`;
        this.id = this.options.id ?? `${this.options.morphName}_id`;
    }

    getRelation() {
        this.setMorphAttribute();

        const relation = {
            ...super.getRelation(),
            join: {
                to: `${this.related.tableName}.${this.ownerKey}`,
                from: `${this.target.tableName}.${this.id}`,
            }
        }

        return relation;
    }
}