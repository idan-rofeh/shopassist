/** Standard API envelope for server responses. */
export interface ApiResponse<T> {
  data: T;
}

/** Health check payload returned by GET /health. */
export interface HealthCheckResponse {
  status: 'ok';
  timestamp: string;
}

export * from './types/chat';
export * from './types/category';
export * from './types/product';
export * from './types/tool-definition';
export * from './types/order';
export * from './types/order-item';
