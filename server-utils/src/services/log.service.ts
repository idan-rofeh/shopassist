import { ServiceName } from '../enums/service-name';

export type LoggerConfig = {
  serviceName: ServiceName;
};

export class Logger {
  private readonly prefix: string;

  constructor(private readonly config: LoggerConfig) {
    this.prefix = `${this.config.serviceName}:: `;
  }

  log(msg: string): void {
    if (!msg) return;

    const log: string = this.prefix + msg;
    console.log(log);
  }

  error(e: any, extra?: string): void {
    if (!e) return;

    let log: string = this.prefix;
    if (typeof e === 'string') {
      log += e;
    } else {
      if (e?.status) log += `status: ${e.status}:: `;
      const msg: string = e?.message || e.msg || e.extra;
      if (msg) log += `${msg} `;
    }

    if (extra) log += extra;

    if (log) console.error(log);
  }

  warn(msg: string): void {
    if (!msg) return;

    const log: string = this.prefix + msg;
    console.warn(log);
  }
}

export function createLoggerFromEnv(): Logger {
  const key = process.env.SERVICE_NAME;
  if (!key || !(key in ServiceName)) {
    throw new Error(
      `Invalid or missing SERVICE_NAME="${key ?? ''}". Expected one of: ${Object.keys(ServiceName).join(', ')}`,
    );
  }

  return new Logger({
    serviceName: ServiceName[key as keyof typeof ServiceName],
  });
}
