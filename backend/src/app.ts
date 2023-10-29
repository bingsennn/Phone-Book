import express from 'express';
import { startConnection } from './utils';
import { entities } from './data';

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
