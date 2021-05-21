import { DatabaseModule } from "@/database.module";
import { Module } from "@nestjs/common";
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