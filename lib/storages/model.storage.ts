import 'reflect-metadata';
import { MODELS_KEY } from '../constants';
import { TableOptions } from '../interfaces';
import { toSnakeCase, pluralize } from '../utils';

type TTableOptions = string | TableOptions;

export function addModel(target: any, options: TableOptions = {}) {
    let model = getModel(target.prototype);

    if (!model) {
        setModel(target.prototype, options)
    }
}

export function setModel(target: any, options: TableOptions) {
    Reflect.defineMetadata(MODELS_KEY, options, target);
}

export function getModel(target: any) {
    return Reflect.getMetadata(MODELS_KEY, target);
}

export function getPrepareModelOptions(target: any, options?: TTableOptions): TableOptions {
    const defaultOptions: TableOptions = {
        name: pluralize.plural(toSnakeCase(target.name)).toLowerCase()
    }

    if (options === undefined) {
        return defaultOptions;
    }

    if (typeof options === 'string') {
        defaultOptions.name = options;

        return defaultOptions;
    }

    return {...defaultOptions, ...options as TableOptions};
}