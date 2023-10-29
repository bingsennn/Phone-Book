import express from 'express';
import dotenv from 'dotenv';
import { startConnection } from './utils';
import { entities } from './data';

dotenv.config();
const port = 3000;
(async () => {
    await startConnection(entities);

    // Importing routes after connection has been established
    const router = ((await import('./route')).default);

    const app = express();
    app.use(express.json());
    app.use(router);
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})();
