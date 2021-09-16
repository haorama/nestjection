import { FactoryProvider, ModuleMetadata, Type } from '@nestjs/common';
import { Knex } from 'knex';

export interface DatabaseModuleOptions {
  models?: any;
  baseModel?: any;

  /** Activate debug to log the query and its bindings */
  debug?: boolean;

  config: Knex.Config;
}

export interface DatabaseOptionsFactory {
  createOptions(): DatabaseModuleOptions | Promise<DatabaseModuleOptions>;
}

export interface DatabaseModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  name?: string;

  useExisting?: Type<DatabaseOptionsFactory>;

  useClass?: Type<DatabaseOptionsFactory>;

  useFactory?: (...args: any[]) => DatabaseModuleOptions | Promise<DatabaseModuleOptions>;

  inject?: FactoryProvider['inject']
}