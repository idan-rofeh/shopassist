import cors from 'cors';
import dotenv from 'dotenv';
import express, { type Request, type Response } from 'express';
import type { ApiResponse, HealthCheckResponse } from '@chatbot/shared';
import ChatRoutes from './routes/chat.routes';
import { errorHandler } from './middlewares/error-handler';

dotenv.config();

const app = express();

const port = Number(process.env.PORT ?? 3000);
const clientOrigin = process.env.CLIENT_ORIGIN ?? 'http://localhost:4200';

app.use(
  cors({
    origin: clientOrigin,
    credentials: true,
  }),
);
app.use(express.json());

//routes
app.use('/chat', ChatRoutes);

app.get('/health', (_req: Request, res: Response<ApiResponse<HealthCheckResponse>>) => {
  const payload: HealthCheckResponse = {
    status: 'ok',
    timestamp: new Date().toISOString(),
  };

  res.status(200).json({ data: payload });
});

// middlewares
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
