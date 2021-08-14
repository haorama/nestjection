import Knex from 'knex';

export interface DatabaseModuleOptions {
    global?: boolean;

    /** Knex Connection Configuration*/
    db: Knex.Config;

    models?: any;
}