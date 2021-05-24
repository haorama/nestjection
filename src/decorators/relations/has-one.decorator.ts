import 'reflect-metadata';
import { Model } from '../../orm';

export function HasOne(modelClass: () => typeof Model, options?: any): PropertyDecorator {
    return (target: any, key: any) => {
        const model = (<typeof Model>target.constructor)

        console.log(model.hiddenFields)
    }
}
