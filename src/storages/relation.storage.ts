import { BelongsToManyOptions, BelongsToOptions, HasManyOptions, HasOneOptions } from "../options";
import { BaseRelation } from "../orm";

const ASSOCIATIONS_KEY = 'mlazuardy_objection:relations';

export type TAssociationOptions =
  | BelongsToOptions
  | HasManyOptions
  | HasOneOptions
  | BelongsToManyOptions;

/** Store relation from the model class */
export function addRelation(target: any, association: BaseRelation) {
    let associations = getRelations(target);

    if (!associations) {
        associations = [];
    }

    associations.push(association);

    setRelations(target, associations);
}

export function setRelations(target: any, associations: BaseRelation[]) {
    Reflect.defineMetadata(ASSOCIATIONS_KEY, associations, target);
}

/** Return relations metadata from model */
export function getRelations(target: any): BaseRelation[] | undefined {
    const associations = Reflect.getMetadata(ASSOCIATIONS_KEY, target);

    if (associations) {
        return [...associations];
    }
}

export function getPreparedRelationOptions(options?: TAssociationOptions) {
    let nonBelongsOptions: TAssociationOptions = {};

    if (options) {
        nonBelongsOptions = { ...options };
    }

    return nonBelongsOptions;
}