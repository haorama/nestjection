import { Model } from "objection";
import { BelongsToOptions } from "../../options";
import { BelongsTo } from "./belongs-to.relation";

export class Relation {
    target: typeof Model;

    constructor(target: typeof Model) {
        this.target = target;
    }

    belongsTo(relatedClass: typeof Model, options: BelongsToOptions = {}) {
        return (new BelongsTo(this.target, relatedClass, options)).getRelation();
    }
}