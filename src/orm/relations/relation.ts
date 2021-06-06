import { BelongsToManyOptions, BelongsToOptions, HasManyOptions, HasManyThroughOptions, HasOneOptions, MorphOneOptions } from "../../options";
import { Model } from "../model";
import { BelongsToManyRelation, BelongsTo, HasManyThroughRelation, HasManyRelation, HasOneRelation, MorphOneRelation } from "./";

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

    belongsToMany(relatedClass: typeof Model, options: BelongsToManyOptions = {}) {
        return new BelongsToManyRelation(this.target, relatedClass, options);
    }

    hasManyThrough(relatedClass: typeof Model, options: HasManyThroughOptions) {
        return new HasManyThroughRelation(this.target, relatedClass, options);
    }

    morphOne(relatedClass: typeof Model, options: MorphOneOptions) {
        return new MorphOneRelation(this.target, relatedClass, options);
    }
}