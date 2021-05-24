import { HasManyOptions } from "../../options";
import { Model } from "../../orm";
import { toSnakeCase } from '../../utils';

export function HasMany(modelClass: () => typeof Model, options: HasManyOptions = {}): PropertyDecorator {
    return (target: any, key: string) => {
        const model = (<typeof Model>target.constructor);
        const targetModel = modelClass();

        const foreignKey = options.foreignKey ?? `${toSnakeCase(model.name)}_id`;
    }
}