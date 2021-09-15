export function getConnectionToken(name?: string) {
    return `knex_connection_${name || 'default'}`;
}