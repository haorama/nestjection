import { Knex } from 'knex';

export interface DatabaseModuleOptions {
    global?: boolean;

    models?: any;

    /** Activate debug to log the query and its bindings */
    debug?: boolean;

    /** Default Database Connection Name, specify your connections using connections options */
    default: string;

    connections: Record<string, Knex.Config>
}