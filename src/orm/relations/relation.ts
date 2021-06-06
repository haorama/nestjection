import { BelongsToOptions, HasManyOptions, HasOneOptions } from "../../options";
import { Model } from "../model";
import { BelongsTo } from "./belongs-to.relation";
import { HasManyRelation } from "./has-many.relation";
import { HasOneRelation } from "./has-one.relation";

export class Relation {
    target: typeof Model;

    constructor(target: typeof Model) {
        this.target = target;
    }

    belongsTo(relatedClass: typeof Model, options: BelongsToOptions = {}) {
        return new BelongsTo(this.target, relatedClass, options).getRelation();
    }

    hasMany(relatedClass: typeof Model, options: HasManyOptions = {}) {
        return new HasManyRelation(this.target, relatedClass, options).getRelation();
    }

    hasOne(relatedClass: typeof Model, options: HasOneOptions = {}) {
        return new HasOneRelation(this.target, relatedClass, options).getRelation();
    }
}