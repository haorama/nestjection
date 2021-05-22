import { Model } from 'objection';
import {Knex} from 'knex';

export interface DatabaseModuleOptions {
    global?: boolean;

    /** Knex Connection Configuration*/
    db: Knex.Config;

    /** Custom base model, default using package model  */
    model?: typeof Model;
}