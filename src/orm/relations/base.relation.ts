import { Model } from "../model";

export class BaseRelation {
    target: typeof Model;
    relatedClass: typeof Model;

    constructor(target: typeof Model, relatedClass: typeof Model) {
        this.target = target;
        this.relatedClass = relatedClass;
    }

    getRelation(): any {
        return
    }
}