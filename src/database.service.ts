import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import { Knex, knex } from 'knex';
import { Model } from "./models";
import { ModuleOptions } from "./options";

@Injectable()
export class DatabaseService implements OnApplicationShutdown {
    private knex: Knex;

    register(options: ModuleOptions) {
        this.knex = knex(options.db);

        if (!options.model) {
            options.model = Model;
        }

        options.model.knex(this.knex);
    }

    async onApplicationShutdown() {
        await this.knex.destroy()
    }
}