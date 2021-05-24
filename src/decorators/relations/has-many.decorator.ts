import { Model } from "../../orm";

export function HasMany(modelClass: () => typeof Model, options: any = {}): PropertyDecorator {
    return (target: any, key: string) => {

    }
}