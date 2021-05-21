import { TableConvention } from "@/unions";

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

function toSnakeCase(value: string) {
    return value.replace(/\W+/g, " ").split(/ |\B(?=[A-Z])/)
        .map(word => word.toLowerCase())
        .join('_');
}

function toSnakePluralCase(value: string) {
    return toSnakeCase(value) + 's';
}

function toCamelCase(value: string) {
    return value
        .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
        .replace(/\s/g, '')
        .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
}