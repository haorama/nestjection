import { BelongsToOptions } from "../../options";
import { Model } from "../model";
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