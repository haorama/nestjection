import { DynamicModule, Module } from "@nestjs/common";
import { NESTJECTION_DB } from "./constants";
import { DatabaseService } from "./database.service";
import { DatabaseModuleOptions } from "./options";

@Module({})
export class DatabaseModule {
    static forRoot(options: DatabaseModuleOptions): DynamicModule {
        const providers = [
            {
                provide: NESTJECTION_DB,
                useFactory: async (dbService: DatabaseService) => {
                    return dbService.register(options)
                },
                inject: [DatabaseService]
            },
        ]

        return {
            global: options.global ?? true,
            module: DatabaseModule,
            providers: [...providers, DatabaseService],
            exports: [...providers]
        }
    }

    static forRootAsync() {

    }
}