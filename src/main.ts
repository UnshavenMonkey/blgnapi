import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {ValidationPipe} from "./pipes/validation.pipe";


async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
        .setTitle('BalaganAPI')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document)

    app.useGlobalPipes(new ValidationPipe())

    // Enable CORS
    app.enableCors({
        origin: 'http://localhost:5173', // Разрешить запросы только с localhost
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Указать разрешенные методы
        allowedHeaders: 'Content-Type, Accept, Authorization', // Указать разрешенные заголовки
        credentials: true, // Если необходимо разрешить запросы с передачей учетных данных (куки, заголовки авторизации)
    });

    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`))
}

start()
