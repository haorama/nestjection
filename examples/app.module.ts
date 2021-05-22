import { Module } from "@nestjs/common";
import { DatabaseModule } from "src";
import db from '../db.json';
import { UserModule } from "./user/user.module";

@Module({
    imports: [
        DatabaseModule.forRoot({
            db
        }),
        UserModule
    ]
})
export class AppModule {}