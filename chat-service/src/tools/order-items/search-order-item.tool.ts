import { OrderItem, OrderItemSearchFilter, ToolDefinition } from "@chatbot/shared";
import { FunctionDeclaration, SchemaType } from "@google/generative-ai";
import { createTool } from "../create-tool";
import { ordersApi } from "../../clients/clients";
import { logger } from "../../services/log.service";

const DOC = `Search order line items by id or orderId. Returns an array of order items.`;

const USAGE = `Use when a user asks for order details, line items, or products in an order.`;

const description = [DOC, USAGE].join('\n\n');

const searchOrderItemsDeclaration: FunctionDeclaration = {
    name: 'searchOrderItems',
    description,
    parameters: {
        type: SchemaType.OBJECT,
        properties: {
            id: {
                type: SchemaType.STRING,
                description: 'Exact order item id',
            },
            orderId: {
                type: SchemaType.STRING,
                description: 'Order id to get all line items for that order',
            },
        },
    },
};

export const searchOrderItems: ToolDefinition = createTool(
    searchOrderItemsDeclaration,
    async (filter: OrderItemSearchFilter) => {
        try {
            const res: OrderItem[] = await ordersApi.orderItems.search(filter);
            return res;
        } catch (e) {
            logger.error(e);
            throw e;
        }
    },
);
