import 'reflect-metadata';
import { Injectable, OnApplicationBootstrap, OnModuleInit } from "@nestjs/common";
import { NESTJECTION_HAS_ONE } from './constants';
import { User } from '../examples/user.model';

@Injectable()
export class RelationScanner implements OnModuleInit {
    onModuleInit() {
        this.scanRelation();
    }

    scanRelation() {
        const user = User.query();
    }
}