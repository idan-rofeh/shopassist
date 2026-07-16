export interface OrderItem {
    id: number;
    orderId: number;
    productId: string;
    quantity: number;
    unitPrice: number;
    createdAt: Date;
    updatedAt: Date | null;
};

export interface OrderItemSearchFilter {
    id?: number;
    orderId?: number;
};