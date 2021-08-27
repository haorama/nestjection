import 'reflect-metadata';
import { RELATIONS_KEY } from '../constants';
import { BelongsToManyOptions, BelongsToOptions, HasManyOptions, HasManyThroughOptions, HasOneOptions, MorphOneOptions } from "../interfaces";
import { BaseRelation } from "../orm";

export type TRelationOptions =
  | BelongsToOptions
  | HasManyOptions
  | HasOneOptions
  | BelongsToManyOptions
  | MorphOneOptions
  | HasManyThroughOptions

/** Store relation from the model class */
export function addRelation(target: any, relation: BaseRelation) {
    let relations = getRelations(target);

    if (!relations) {
        relations = [];
    }

    relations.push(relation);

    setRelations(target, relations);
}

export function setRelations(target: any, relations: BaseRelation[]) {
    Reflect.defineMetadata(RELATIONS_KEY, relations, target);
}

/** Return relations metadata from model */
export function getRelations(target: any): BaseRelation[] | undefined {
    const relations = Reflect.getMetadata(RELATIONS_KEY, target);

    if (relations) {
        return [...relations];
    }
}

export function getPreparedRelationOptions(options?: TRelationOptions) {
    let relationOptions: TRelationOptions = {};

    if (options) {
        relationOptions = { ...options };
    }

    return relationOptions;
}