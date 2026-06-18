import { AppModule } from './app.module.js';
import { FsArchAppBuilder } from "./fsarch/FsArchApp.js";
import { DATABASE_OPTIONS } from "./database/index.js";

async function bootstrap() {
  const app = await new FsArchAppBuilder(AppModule, {
    name: 'Bot-Protection-Server',
    version: '1.0.0',
  })
    .addSwagger({
      title: 'Bot-Protection-Server',
      description: 'The Bot-Protection-Server API description',
      version: '1.0',
    })
    .enableAuth()
    .setDatabase(DATABASE_OPTIONS)
    .build();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
