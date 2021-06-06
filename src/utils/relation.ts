import 'reflect-metadata';
import { RelationMapping, RelationMappings, RelationMappingsThunk } from "objection";
import { BaseRelation } from '../orm/relations/base.relation';

export const RELATIONS_KEY = 'mlazuardy:relations';

export function appendOrCreateRelation(relations: RelationMappings | RelationMappingsThunk, key: string, relation: RelationMapping<any>) {
    if (!relations) {
        return {
            [key]: relation
        };
    }

    return {
        ...relations,
        [key]: relation
    }
}

export function getRelation(target: any) {
    const relations = Reflect.getMetadata(RELATIONS_KEY, target);

    console.log(relations)

    // if (relations) {
    //     return [...relations];
    // }
}

export function setRelation(target: any, key: string, relation: BaseRelation) {
    const currentRelation = getRelation(target);

    Reflect.defineMetadata(RELATIONS_KEY, {[key]: relation}, target);
}
