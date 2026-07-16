export interface Order {
    id: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date | null;
};

export interface OrderSearchFilter {
    id?: number;
    userId?: number;
};