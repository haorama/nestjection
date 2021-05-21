import { NestFactory } from "@nestjs/core";
import { AppModule} from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    try {
        await app.listen(9000)
    } catch (error) {
        await app.close();

        process.exit(1);
    }
}

bootstrap();