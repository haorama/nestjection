import { Provider } from "@nestjs/common";
import { DatabaseModuleOptions } from ".";
import { getConnectionToken } from "./utils";
import Knex from 'knex';
import { MODULE_OPTIONS } from "./constants";

export function createConnectionProviders(options: DatabaseModuleOptions): Provider[] {
    const keys = Object.keys(options.connections);

    return keys.map((key) => ({
        provide: getConnectionToken(options.default === key ? 'default' : key),
        useValue: Knex(options.connections[key])
    }))
}

export function createOptionsProvider(options: DatabaseModuleOptions): Provider {
    return {
        provide: MODULE_OPTIONS,
        useValue: options
    }
}