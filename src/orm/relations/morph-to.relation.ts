import { MorphToOptions } from "../../interfaces/relations/morph-to.options";
import { ModelClass } from "../../types";
import { Model } from "../model";
import { BelongsToRelation } from "./belongs-to.relation";

export class MorphToRelation extends BelongsToRelation {
    options: MorphToOptions

    constructor(target: Model, relatedClass: ModelClass, options?: any) {
        super(target, relatedClass);

        this.options = options;
    }

    getRelation() {
        return {
            ...super.getRelation()
        }
    }
}