import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import { knex, Knex } from 'knex';
import { Model } from "./orm";
import { DatabaseModuleOptions } from "./options";

@Injectable()
export class DatabaseService implements OnApplicationShutdown {
    private knex: Knex;

    register(options: DatabaseModuleOptions) {
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