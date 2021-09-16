import 'reflect-metadata';
import { RELATIONS_KEY } from '../constants';
import { MorphManyOptions, MorphToManyOptions, BelongsToManyOptions, BelongsToOptions, HasManyOptions, HasManyThroughOptions, HasOneOptions, MorphOneOptions } from "../interfaces";
import { Relation } from '../orm/relations/relation';

export type TRelationOptions = BelongsToOptions
    | HasManyOptions
    | BelongsToManyOptions
    | HasManyThroughOptions
    | MorphOneOptions
    | MorphManyOptions
    | HasOneOptions
    | MorphToManyOptions

/** Store relation from the model class */
export function addRelation(target: any, relation: Relation<any>) {
    let relations = getRelations(target);

    if (!relations) {
        relations = [];
    }

    relations.push(relation);

    setRelations(target, relations);
}

export function setRelations(target: any, relations: Relation<any>[]) {
    Reflect.defineMetadata(RELATIONS_KEY, relations, target);
}

/** Return relations metadata from model */
export function getRelations(target: any): Relation<any>[] | undefined {
    const relations = Reflect.getMetadata(RELATIONS_KEY, target);

    if (relations) {
        return [...relations];
    }
}

export function getPreparedRelationOptions(propertyKey: string, options?: TRelationOptions) {
    const as = options?.as || propertyKey;

    let relationOptions: TRelationOptions = {as} as any;

    if (options) {
        relationOptions = {
            as,
            ...options
        };
    }

    return relationOptions;
}