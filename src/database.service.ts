import { Injectable, OnApplicationShutdown } from "@nestjs/common";
import Knex from 'knex';
import { Model } from "./orm";
import { DatabaseModuleOptions } from "./options";

@Injectable()
export class DatabaseService implements OnApplicationShutdown {
    private knex: Knex;

    register(options: DatabaseModuleOptions) {
        this.knex = Knex(options.db);

        Model.knex(this.knex);
    }

    async onApplicationShutdown() {
        await this.knex.destroy()
    }
}