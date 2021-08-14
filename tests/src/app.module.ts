import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { DatabaseModule } from '../../src/database.module';
import { DB_CONNECTION } from "./connection";

@Module({
    imports: [
        DatabaseModule.forRoot({
            db: DB_CONNECTION,
            models: ['./tests/dist/**/*.model{.ts,.js}']
        }),
        UserModule,
    ]
})
export class AppModule {}