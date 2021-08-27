import { Injectable, OnApplicationBootstrap, OnApplicationShutdown, Logger } from "@nestjs/common";
import KnexInstance, { Knex } from 'knex';
import { Model } from "./orm";
import { DatabaseModuleOptions } from "./interfaces";
import glob from 'glob';
import { resolve } from 'path';
import { getFullfilepathWithoutExtension, isImportable, performanceNow, uniqueFilter } from "./utils";

@Injectable()
export class DatabaseService implements OnApplicationShutdown, OnApplicationBootstrap {
    private readonly logger = new Logger(DatabaseService.name);

    knex: Knex;

    models: any[] = [];

    protected logs: {
        [key: string]: any
    }

    protected count: number = 0;

    register(options: DatabaseModuleOptions) {
        this.knex = KnexInstance(options.db);
        this.models = options.models;

        Model.knex(this.knex);

        this.shouldShowDebug(options.debug);
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

    private shouldShowDebug(debug?: boolean) {
        if (debug) {
            this.knex.on('query', (query) => this.setPerformance(query));
            this.knex.on('query-response', (response, query) => this.getPerformance(response, query))
        }
    }

    private getPerformance(response: any, query: any) {
        const uid = query.__knexQueryUid;

        if (this.logs && this.logs[uid]) {
            this.logs[uid].endTime = performanceNow(this.logs[uid].start);
            this.logs[uid].finished = true;

            this.logger.log(`${this.logs[uid].query.sql} ${this.logs[uid].endTime}ms`)
        }
    }

    private setPerformance(query: any) {
        const uid = query.__knexQueryUid;

        const debugValue = {
            query,
            position: this.count,
            start: process.hrtime(),
            finished: false,
        }

        if (!this.logs) {
            this.logs = { [uid]: debugValue }

            this.count = this.count + 1;
        } else {
            this.logs[uid] = debugValue;
        }
    }

    protected getModels() {
        // const hasSupportedExtension = (path: string) => ['.ts', '.js'].indexOf(extname(path)) !== -1;

        return this.models.reduce((models: any[], dir) => {
            const _models = glob.sync(dir)
                .filter(isImportable)
                .map(getFullfilepathWithoutExtension)
                .filter(uniqueFilter)
                .map(fullPath => {
                    const module = require(resolve(fullPath));

                    const matchedMemberKey = Object.keys(module).find((m) => m);

                    const matchedMember = matchedMemberKey ? module[matchedMemberKey] : undefined;

                    return matchedMember || module.default;
                })

            models.push(..._models);

            return models;
        }, [])
    }
}