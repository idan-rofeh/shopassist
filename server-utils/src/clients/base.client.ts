import { ServiceName } from '../enums';

export abstract class BaseClient {
  protected readonly baseUrl: string;

  constructor(
    readonly serviceName: ServiceName,
    protected readonly envKey: string,
    protected readonly allowedList: ServiceName[],
  ) {
    const baseUrl = process.env[envKey];
    if (!baseUrl) {
      throw new Error(`Missing env ${envKey} for ${serviceName}`);
    }
    this.baseUrl = baseUrl;
  };
};
