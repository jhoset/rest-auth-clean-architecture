import { envs } from "./config/envs";
import { MongoDatabase } from "./data/mongodb";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
    main();
})();


async function main(...params: any) {
    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL,
    })

    // TODO: Init web server
    const server = new Server({ port: envs.PORT, router: AppRoutes.routes });
    server.start();
}