import { MorphToOptions } from "../../interfaces/relations/morph-to.options";
import { ModelClass } from "../../types";
import { Model } from "../model";
import { BelongsToRelation } from "./belongs-to.relation";

export class MorphToRelation extends BelongsToRelation {
    options: MorphToOptions;

    morphs: typeof Model[]

    constructor(target: Model, morphs: typeof Model[], options?: MorphToOptions) {
        super(target, null);
        this.morphs = morphs;

        this.options = options;
    }

    getRelation() {
        return this.mergeRelation({
            ...super.getRelation()
        })
    }
}