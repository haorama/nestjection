import { HasManyOptions } from "../../options";
import { Model } from "../../orm";
import { appendOrCreateRelation, toSnakeCase } from '../../utils';

export function HasMany(modelClass: () => typeof Model, options: HasManyOptions = {}): PropertyDecorator {
    return (target: any, key: string) => {
        const model = (<typeof Model>target.constructor);
        const targetModel = modelClass();

        const foreignKey = options.foreignKey ?? `${toSnakeCase(model.name)}_id`;
        const localKey = options.localKey ?? 'id';

        const relation = {
            modelClass: targetModel,
            relation: model.HasManyRelation,
            join: {
                from: `${model.tableName}.${localKey}`,
                to: `${targetModel.tableName}.${foreignKey}`
            }
        }

        model.relationMappings = appendOrCreateRelation(model.relationMappings, key, relation)
    }
}