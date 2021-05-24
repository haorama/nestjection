import { RelationMapping, RelationMappings, RelationMappingsThunk } from "objection";

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