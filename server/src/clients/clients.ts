import { createClients, ServiceName } from '@chatbot/server-utils';
export const clients = createClients(ServiceName.CHAT);

export const catalogApi = clients[ServiceName.CATALOG]!;
export const ordersApi = clients[ServiceName.ORDERS]!;