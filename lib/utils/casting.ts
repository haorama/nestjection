import { PropertyCast } from "../types";

export function toSnakeCase(value: string) {
    return value.replace(/\W+/g, " ").split(/ |\B(?=[A-Z])/)
        .map(word => word.toLowerCase())
        .join('_');
}

export function toSnakePluralCase(value: string) {
    return toSnakeCase(value) + 's';
}

/** Convert value to given "to" param */
export function castValue(value: any, to: PropertyCast) {
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