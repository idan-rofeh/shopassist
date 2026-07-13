import 'dotenv/config';

import { createLoggerFromEnv } from '@chatbot/server-utils';

export const logger = createLoggerFromEnv();
