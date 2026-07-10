import dotenv from 'dotenv';

import { createApp } from './app';

dotenv.config();

const port = Number(process.env.PORT);
const clientOrigin = process.env.CLIENT_ORIGIN!;
const chatServiceUrl = process.env.CHAT_SERVICE_URL!;

const app = createApp({
    clientOrigin,
    chatServiceUrl,
});

app.listen(port, () => {
    console.log(`Gateway listening on http://localhost:${port}`);
});