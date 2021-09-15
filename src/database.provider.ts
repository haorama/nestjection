import { OnApplicationShutdown, Provider } from "@nestjs/common";
import { DatabaseModuleOptions } from ".";
import { getConnectionToken } from "./utils";
import Knex, { Knex as IKnex } from 'knex';
import { MODULE_OPTIONS } from "./constants";

function buildConnection(config: IKnex.Config) {
    const conn = Knex(config);

    (conn as unknown as OnApplicationShutdown).onApplicationShutdown = function (
        this: IKnex,
      ) {
        return this.destroy()
    };

    return conn;
}

export function createConnectionProviders(options: DatabaseModuleOptions): Provider[] {
    const keys = Object.keys(options.connections);

    return keys.map((key) => ({
        provide: getConnectionToken(options.default === key ? 'default' : key),
        useValue: buildConnection(options.connections[key])
    }))
}

export function createOptionsProvider(options: DatabaseModuleOptions): Provider {
    return {
        provide: MODULE_OPTIONS,
        useValue: options
    }
}