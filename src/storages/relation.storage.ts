import 'reflect-metadata';
import { BelongsToManyOptions, BelongsToOptions, HasManyOptions, HasOneOptions } from "../options";
import { BaseRelation } from "../orm";

const RELATIONS_KEY = 'mlazuardy_objection:relations';

export type TRelationOptions =
  | BelongsToOptions
  | HasManyOptions
  | HasOneOptions
  | BelongsToManyOptions;

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
    let nonBelongsOptions: TRelationOptions = {};

    if (options) {
        nonBelongsOptions = { ...options };
    }

    return nonBelongsOptions;
}

// Relation.ts
let relationMap = new WeakMap<any, Map<string, () => Function>>();
export function Relation(model: () => Function) {
  return function (target, propertyName) {
    // Calling `model` here may not give you the value, you need to
    // store it somewhere and evaluate it later...
    let map = relationMap.get(target);
    if (!map) relationMap.set(target, map = new Map<string, () => Function>());
    map.set(propertyName, model);
  }
}

export function getRelation(target, propertyName) {
  while (target) {
    let map = relationMap.get(target);
    if (map) {
      let model = map.get(propertyName);
      if (model) {
        return model();
      }
    }
    target = Object.getPrototypeOf(target);
  }
}