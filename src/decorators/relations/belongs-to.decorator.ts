import 'reflect-metadata';
import { BelongsToOptions } from '../../options/relations';
import { Model } from '../../orm';
import { appendOrCreateRelation, toSnakeCase } from '../../utils';

export function BelongsTo(modelClass: () => typeof Model, options: BelongsToOptions = {}): PropertyDecorator {
    return (target: any, key: string) => {
        const model = (<typeof Model>target.constructor);

        const targetModel = modelClass();

        if (targetModel) {
            const foreignKey = options.foreignKey ?? `${toSnakeCase(targetModel.name)}_id`;
            const ownerKey = options.ownerKey ?? 'id';

            const relation = {
                modelClass: modelClass(),
                relation: model.BelongsToOneRelation,
                join: {
                    to: `${model.tableName}.${foreignKey}`,
                    from: `${modelClass().tableName}.${ownerKey}`
                }
            }

            model.relationMappings = appendOrCreateRelation(model.relationMappings, key, relation)
        }
    }
}
