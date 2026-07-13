import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';

import { Logger } from "./log.service";

export type HttpClientConfig = {
    logger: Logger;
    timeout?: number;
    retries?: number;
};

export type sendParams = {
    url: string;
    method: HttpVerb;
    data?: any;
    params?: Record<string, unknown>;
    retries?: number;
    timeout?: number;
};

export type HttpVerb = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export class HttpClient {
    private readonly DEFAULT_RETRIES: number = 1;
    private readonly DEFAULT_TIMEOUT: number = 3000;

    constructor(
        private readonly config: HttpClientConfig,
    ) {
        this.config.retries = this.config.retries || this.DEFAULT_RETRIES;
        this.config.timeout = this.config.timeout || this.DEFAULT_TIMEOUT;
    };

    public async send<T>(options: sendParams): Promise<T>{
        const client = this.createClient();
        const { url, method, data, params } = options;

        try {
            const response = await client.request<T>({
                url,
                method,
                data,
                params,
            });

            return response.data;
        } catch (e) {
            const extra: string = ` < *axios options*: URL: ${url}, Method: ${method}, Data: ${data}, Params: ${params} > `;
            this.config.logger.error(e, extra);

            throw e;
        };
    };

    private createClient(): AxiosInstance {
        const client = axios.create({ timeout: this.config.timeout });

        axiosRetry(client, {
            retries: this.config.retries,
            retryDelay: axiosRetry.exponentialDelay,
            retryCondition: (error) => 
                axiosRetry.isNetworkOrIdempotentRequestError(error)
            ,
        });

        return client;
    };

};