import { ModelCase, TableConvention } from "../types";

/** @deprecated */
export function getModelTableConvention(convention: TableConvention, value: string) {
    switch (convention) {
        case 'snake_case':
            return toSnakeCase(value)
        case 'camelCase':
            return toCamelCase(value)
        default:
            return toSnakePluralCase(value);
    }
}

export function toSnakeCase(value: string) {
    return value.replace(/\W+/g, " ").split(/ |\B(?=[A-Z])/)
        .map(word => word.toLowerCase())
        .join('_');
}

export function toSnakePluralCase(value: string) {
    return toSnakeCase(value) + 's';
}

function toCamelCase(value: string) {
    return value
        .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
        .replace(/\s/g, '')
        .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
}

/** Convert value to given "to" param */
export function castValue(value: any, to: ModelCase) {
    if (to === 'number') {
        return parseInt(value);
    }

    if (to === 'float') {
        return parseFloat(value);
    }

    if (to === 'string') {
        return String(value);
    }

    if (value && typeof value == 'string' && to === 'json') {
        return JSON.parse(value);
    }

    return value;
}