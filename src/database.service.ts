import { Injectable, OnApplicationBootstrap, OnApplicationShutdown } from "@nestjs/common";
import Knex from 'knex';
import { Model } from "./orm";
import { DatabaseModuleOptions } from "./interfaces";
import glob from 'glob';
import { extname, basename, resolve } from 'path';
import { getFullfilepathWithoutExtension, isImportable, uniqueFilter } from "./utils";

@Injectable()
export class DatabaseService implements OnApplicationShutdown, OnApplicationBootstrap {
    knex: Knex;

    models: any[] = [];

    register(options: DatabaseModuleOptions) {
        this.knex = Knex(options.db);
        this.models = options.models;

        Model.knex(this.knex);
    }

    async onApplicationShutdown() {
        await this.knex.destroy()
    }

    onApplicationBootstrap() {
        const models = this.getModels();

        models.map((model: any) => {
            if (model && typeof model.boot === 'function') model.boot()
        })
    }

    protected getModels() {
        // const hasSupportedExtension = (path: string) => ['.ts', '.js'].indexOf(extname(path)) !== -1;

        return this.models.reduce((models: any[], dir) => {
            const _models = glob.sync(dir)
                .filter(isImportable)
                .map(getFullfilepathWithoutExtension)
                .filter(uniqueFilter)
                .map(fullPath => {
                    const fileName = basename(fullPath);

                    const module = require(resolve(fullPath));

                    const matchedMemberKey = Object.keys(module).find((m) => {
                        const modelStripped = fileName.substring(0, fileName.indexOf('.model'));
                        return modelStripped === m.toLowerCase();
                    });

                    const matchedMember = matchedMemberKey ? module[matchedMemberKey] : undefined;

                    return matchedMember || module.default;
                })

            models.push(..._models);

            return models;
        }, [])
    }
}