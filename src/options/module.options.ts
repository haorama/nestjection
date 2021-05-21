import { Model } from 'objection';
import {Knex} from 'knex';

export interface ModuleOptions {
    global?: boolean;

    /** Knex Connection Configuration*/
    db: Knex.Config;

    /** Custom base model, default using package model  */
    model?: typeof Model;
}