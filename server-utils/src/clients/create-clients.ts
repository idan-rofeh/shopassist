import { ServiceName } from '../enums';
import { HttpClient, Logger } from '../services';
import { CatalogClient } from './catalog.client';
import { OrdersClient } from './orders.client';

const CLIENTS = [
    CatalogClient,
    OrdersClient,
];

export type ServiceClients = {
    [ServiceName.CATALOG]?: CatalogClient;
    [ServiceName.ORDERS]?: OrdersClient;
};

export function createClients(origin: ServiceName): ServiceClients {
  const http = new HttpClient({
    logger: new Logger({ serviceName: origin }),
  });
  const clients: ServiceClients = {};

  for (const Client of CLIENTS) {
    if (!Client.allowedList.includes(origin)) {
      continue;
    };

    (clients as Record<string, unknown>)[Client.serviceName] = new Client(http);
  };

  return clients;
};
