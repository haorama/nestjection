import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../src';
import { AppController } from './app.controller';

@Module({
  imports: [
    DatabaseModule.forRoot({
      db: {
        client: 'mysql2',
        connection: {
          host: 'localhost',
          user: 'root',
          password: 'T@bola419',
          database: 'visit_project_db'
        }
      }
    })
  ],
  controllers: [AppController]
})
export class AppModule {}
