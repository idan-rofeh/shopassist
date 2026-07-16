import dotenv from 'dotenv';
import { createApp } from './app';

dotenv.config();

const port = Number(process.env.PORT);
const app = createApp();

app.listen(port, () => {
    console.log(`${process.env.SERVICE_NAME} listening on port ${port}`);
    }
);