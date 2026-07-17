import { Order, OrderSearchFilter, ToolDefinition } from "@chatbot/shared";
import { FunctionDeclaration, SchemaType } from "@google/generative-ai";
import { createTool } from "../create-tool";
import { ordersApi } from "../../clients/clients";
import { logger } from "../../services/log.service";

const DOC = `Search user orders by id or userId. Returns an array of orders.
    Response lists results under the data property`;

const USAGE = `Use when a user is asking about his or hers orders.`;

const PRIVACY = ``;

const BROAD_QUERIES = `If a user is asking to retreive all of his or hers orders, you can return a maximum of the 3 latest orders.
    If the user requires more orders - ask for id to better tailor the query`;

const description = [
    DOC,
    USAGE,
    PRIVACY,
    BROAD_QUERIES,
].join('\n\n');

const searchOrdersDeclaration: FunctionDeclaration = {
    name: 'searchOrders',
    description,
    parameters: {
        type: SchemaType.OBJECT,
        properties: {
            id: {
                type: SchemaType.STRING,
                description: 'Exact category id, e.g. "001" or "002"',
            },
            userId: {
                type: SchemaType.STRING,
                description: 'Exact category id, e.g. "001" or "002"',
            },
        },
    },
};

export const searchOrders: ToolDefinition = createTool(
    searchOrdersDeclaration,
    async (filter: OrderSearchFilter) => {
        try {
            const res: Order[] = await ordersApi.findOrders(filter);
            return res;
        } catch (e) {
            logger.error(e);
            throw e;
        };
    },
);


// const SECURITY = `This data set should only be available to the client owning them - it is strictly forbidden to expose an order to a different user than it's client.`;