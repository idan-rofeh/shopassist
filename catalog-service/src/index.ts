import dotenv from 'dotenv';
import { createApp } from './app';

dotenv.config();

const port = Number(process.env.PORT);
const app = createApp();

app.listen(port, () => {
    console.log(`Catalog listening on port ${port}`);
    }
);