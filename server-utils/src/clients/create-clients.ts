import { ServiceName } from '../enums';
import { HttpClient, Logger } from '../services';
import type { BaseClient } from './base.client';
import { CatalogClient } from './catalog.client';

const CLIENTS = [
    CatalogClient,
];

export type ServiceClients = {
    [ServiceName.CATALOG]?: CatalogClient;
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

    clients[Client.serviceName] = new Client(http);
  };

  return clients;
};
