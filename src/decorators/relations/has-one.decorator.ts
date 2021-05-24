import 'reflect-metadata';
import { HasOneOptions } from '../../options';
import { Model } from '../../orm';
import { appendOrCreateRelation, toSnakeCase } from '../../utils';

export function HasOne(modelClass: () => typeof Model, options: HasOneOptions = {}): PropertyDecorator {
    return (target: any, key: string) => {
        const model = (<typeof Model>target.constructor);
        const targetModel = modelClass();

        const foreignKey = options.foreignKey ?? `${toSnakeCase(model.name)}_id`;
        const localKey = options.localKey ?? 'id';

        if (targetModel) {
            const relation = {
                modelClass: targetModel,
                relation: model.HasOneRelation,
                join: {
                    from: `${model.tableName}.${localKey}`,
                    to: `${targetModel.tableName}.${foreignKey}`
                }
            }

            model.relationMappings =  appendOrCreateRelation(model.relationMappings, key, relation);
        }
    }
}
