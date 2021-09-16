import { OnApplicationShutdown, Provider } from '@nestjs/common';
import {
  DatabaseModuleAsyncOptions,
  DatabaseModuleOptions,
  DatabaseOptionsFactory,
} from '.';
import { getConnectionToken } from './utils';
import Knex, { Knex as IKnex } from 'knex';
import { MODULE_OPTIONS } from './constants';

export function buildConnection(config: IKnex.Config) {
  const conn = Knex(config);

  (conn as unknown as OnApplicationShutdown).onApplicationShutdown = function (
    this: IKnex,
  ) {
    return this.destroy();
  };

  return conn;
}

export function createConnectionProvider(
  options: DatabaseModuleOptions,
): Provider {
  return {
    provide: getConnectionToken(),
    useValue: buildConnection(options.config),
  };
}

export function createOptionsProvider(
  options: DatabaseModuleOptions,
): Provider {
  return {
    provide: MODULE_OPTIONS,
    useValue: options,
  };
}

export function createAsyncProviders(
  options: DatabaseModuleAsyncOptions,
): Provider[] {
  if (options.useExisting || options.useFactory) {
    return [createAsyncOptionsProvider(options)];
  }

  return [
    createAsyncOptionsProvider(options),
    {
      provide: options.useClass,
      useClass: options.useClass,
    },
  ];
}

export function createAsyncOptionsProvider(
  options: DatabaseModuleAsyncOptions,
): Provider {
  if (options.useFactory) {
    return {
      inject: options.inject || [],
      provide: MODULE_OPTIONS,
      useFactory: options.useFactory,
    };
  }

  return {
    inject: [options.useExisting || options.useClass],
    provide: MODULE_OPTIONS,
    useFactory: (optionsFactory: DatabaseOptionsFactory) =>
      optionsFactory.createOptions(),
  };
}
