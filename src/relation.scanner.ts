import 'reflect-metadata';
import { Injectable, OnModuleInit } from "@nestjs/common";
import { User } from './example.model';

@Injectable()
export class RelationScanner implements OnModuleInit {
    onModuleInit() {
        this.scanRelation();
    }

    scanRelation() {
        const user = User;

        console.log(user)
    }
}