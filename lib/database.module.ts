import { DynamicModule, Module, Provider } from '@nestjs/common';
import {
  DatabaseModuleOptions,
  DatabaseModuleAsyncOptions,
} from './interfaces';
import {
  buildConnection,
  createAsyncProviders,
  createConnectionProvider,
  createOptionsProvider,
} from './database.provider';
import { ModelExplorer } from './model.explorer';
import { MODULE_OPTIONS } from './constants';
import { getConnectionToken } from './utils';

@Module({})
export class DatabaseModule {
  static forRoot(options: DatabaseModuleOptions): DynamicModule {
    const connectionProvider = createConnectionProvider(options);
    const optionsProvider = createOptionsProvider(options);

    return {
      global: true,
      module: DatabaseModule,
      providers: [ModelExplorer, optionsProvider, connectionProvider],
      exports: [connectionProvider],
    };
  }

  static forRootAsync(options: DatabaseModuleAsyncOptions): DynamicModule {
    const connectionProvider: Provider = {
      provide: getConnectionToken(options.name),
      inject: [MODULE_OPTIONS],
      useFactory: (opt: DatabaseModuleOptions) => {
        return buildConnection(opt.config);
      },
    };

    const imports = options.imports || [];

    const providers = createAsyncProviders(options);

    providers.push(ModelExplorer);

    return {
      imports,
      providers: [...providers, connectionProvider],
      global: true,
      module: DatabaseModule,
      exports: [...providers, connectionProvider],
    };
  }
}
