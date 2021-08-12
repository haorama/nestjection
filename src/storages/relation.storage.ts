import { BelongsToManyOptions, BelongsToOptions, HasManyOptions, HasOneOptions } from "../options";
import { BaseRelation } from "../orm";

const RELATIONNS_KEY = 'mlazuardy_objection:relations';

export type TRelationOptions =
  | BelongsToOptions
  | HasManyOptions
  | HasOneOptions
  | BelongsToManyOptions;

/** Store relation from the model class */
export function addRelation(target: any, relation: BaseRelation) {
    let relations = getRelations(target.constructor);

    if (!relations) {
        relations = [];
    }

    relations.push(relation);

    setRelations(target.constructor, relations);
}

export function setRelations(target: any, relations: BaseRelation[]) {
    Reflect.defineMetadata(RELATIONNS_KEY, relations, target.constructor);
}

/** Return relations metadata from model */
export function getRelations(target: any): BaseRelation[] | undefined {
    const relations = Reflect.getMetadata(RELATIONNS_KEY, target.constructor);

    if (relations) {
        return [...relations];
    }
}

export function getPreparedRelationOptions(options?: TRelationOptions) {
    let nonBelongsOptions: TRelationOptions = {};

    if (options) {
        nonBelongsOptions = { ...options };
    }

    return nonBelongsOptions;
}