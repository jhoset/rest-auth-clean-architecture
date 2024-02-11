import express, { Router } from 'express';
import { json } from 'stream/consumers';

export interface Options {
    port?: number;
    router: Router
}


export class Server {

    public readonly app = express();
    private readonly port: number;
    private readonly router: Router;

    constructor(options: Options) {
        const { port = 3000, router } = options;
        this.port = port;
        this.router = router;
    }

    async start() {

        this.app.use(express.json())

        this.app.use(express.urlencoded({ extended: true }));


        this.app.use(this.router)

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })


    }


}