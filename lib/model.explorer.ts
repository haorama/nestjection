import {
  Injectable,
  OnApplicationBootstrap,
  Logger,
  OnModuleInit,
  Inject,
} from '@nestjs/common';
import { Knex } from 'knex';
import { Model } from './orm';
import { DatabaseModuleOptions } from './interfaces';
import * as glob from 'glob';
import { resolve, extname } from 'path';
import {
  getConnectionToken,
  getFullfilepathWithoutExtension,
  isImportable,
  performanceNow,
  uniqueFilter,
} from './utils';
import { MODULE_OPTIONS } from './constants';
import { InjectKnex } from './decorators';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class ModelExplorer implements OnApplicationBootstrap, OnModuleInit {
  private readonly logger = new Logger(ModelExplorer.name);

  constructor(
    @Inject(ModuleRef) private readonly moduleRef: ModuleRef,
    @Inject(MODULE_OPTIONS) private options: DatabaseModuleOptions,
    @InjectKnex() private knex: Knex,
  ) {}

  models: any[] = [];

  protected logs: {
    [key: string]: any;
  };

  onModuleInit() {
    this.register();
  }

  protected count = 0;

  register() {
    const options = this.options;
    this.models = options.models;

    Model.knex(this.knex);

    this.shouldShowDebug(options.debug);
  }

  onApplicationBootstrap() {
    const models = this.getModels();

    models.map((model: typeof Model) => {
      if (model && typeof model.boot === 'function') {
        this.bootModel(model);
      }
    });
  }

  private bootModel(model: typeof Model) {
    if (model.connection) {
      try {
        const conn = this.moduleRef.get(getConnectionToken(model.connection));
        model.knex(conn);
      } catch (error) {
        this.logger.error(
          `No connection name: ${model.connection} in your connections options`,
        );
      }
    }

    model.boot();
  }

  private shouldShowDebug(debug?: boolean) {
    if (debug) {
      this.knex.on('query', (query) => this.setPerformance(query));
      this.knex.on('query-response', (response, query) =>
        this.getPerformance(response, query),
      );
    }
  }

  private getPerformance(response: any, query: any) {
    const uid = query.__knexQueryUid;

    if (this.logs && this.logs[uid]) {
      this.logs[uid].endTime = performanceNow(this.logs[uid].start);
      this.logs[uid].finished = true;

      this.logger.log(
        `${this.logs[uid].query.sql} ${this.logs[uid].endTime}ms bindings=${query.bindings}`,
      );
    }
  }

  private setPerformance(query: any) {
    const uid = query.__knexQueryUid;

    const debugValue = {
      query,
      position: this.count,
      start: process.hrtime(),
      finished: false,
    };

    if (!this.logs) {
      this.logs = { [uid]: debugValue };

      this.count = this.count + 1;
    } else {
      this.logs[uid] = debugValue;
    }
  }

  protected getModels() {
    const hasSupportedExtension = (path: string) =>
      ['.ts', '.js'].indexOf(extname(path)) !== -1;

    return this.models.reduce((models: any[], dir) => {
      const _models = glob
        .sync(dir)
        .filter(isImportable)
        .filter(hasSupportedExtension)
        .map(getFullfilepathWithoutExtension)
        .filter(uniqueFilter)
        .map((fullPath) => {
          const module = require(resolve(fullPath));

          const matchedMemberKey = Object.keys(module).find((m) => m);

          const matchedMember = matchedMemberKey
            ? module[matchedMemberKey]
            : undefined;

          return matchedMember || module.default;
        });

      models.push(..._models);

      return models;
    }, []);
  }
}
