import { BelongsToManyOptions, BelongsToOptions, HasManyOptions, HasManyThroughOptions, HasOneOptions, MorphOneOptions } from "../../interfaces";
import { ModelClass } from "../../types";
import { Model } from "../model";
import { BelongsToManyRelation, BelongsToRelation, HasManyThroughRelation, HasManyRelation, HasOneRelation, MorphOneRelation } from "./";

export class Relation {
    target: Model;

    constructor(target: Model) {
        this.target = target;
    }

    belongsTo(relatedClass: ModelClass, options: BelongsToOptions = {}) {
        return new BelongsToRelation(this.target, relatedClass, options).getRelation();
    }

    hasMany(relatedClass: ModelClass, options: HasManyOptions = {}) {
        return new HasManyRelation(this.target, relatedClass, options).getRelation();
    }

    hasOne(relatedClass: ModelClass, options: HasOneOptions = {}) {
        return new HasOneRelation(this.target, relatedClass, options).getRelation();
    }

    belongsToMany(relatedClass: ModelClass, options: BelongsToManyOptions = {}) {
        return new BelongsToManyRelation(this.target, relatedClass, options).getRelation();
    }

    hasManyThrough(relatedClass: ModelClass, options: HasManyThroughOptions) {
        return new HasManyThroughRelation(this.target, relatedClass, options).getRelation();
    }

    morphOne(relatedClass: ModelClass, options: MorphOneOptions) {
        return new MorphOneRelation(this.target, relatedClass, options).getRelation();
    }
}