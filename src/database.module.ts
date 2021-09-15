import { DynamicModule, Module } from "@nestjs/common";
import { DatabaseModuleOptions } from "./interfaces";
import { createConnectionProviders, createOptionsProvider } from "./database.provider";
import { ModelExplorer } from "./model.explorer";

@Module({})
export class DatabaseModule {
    static forRoot(options: DatabaseModuleOptions): DynamicModule {
        const providers = createConnectionProviders(options);
        const optionsProvider = createOptionsProvider(options);

        return {
            global: options.global ?? true,
            module: DatabaseModule,
            providers: [...providers, optionsProvider, ModelExplorer],
            exports: [...providers]
        }
    }
}