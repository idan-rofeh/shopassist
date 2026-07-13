# ChatBot / Order Desk

Monorepo for learning server-controlled, tool-gated chatbot architecture with Angular, Node.js, Gemini, and microservices.

> **For AI agents:** read [AGENTS.md](./AGENTS.md) at the start of every session for project context, conventions, and milestone status.

## Structure

| Package | Description |
|---------|-------------|
| `client/` | Angular frontend with chat UI |
| `gateway/` | Public API entrance — proxies `/chat` → chat service |
| `server/` | Chat service (Gemini, tools) |
| `catalog-service/` | Products + categories REST API |
| `server-utils/` | Shared Node helpers (logger, HttpClient, CatalogClient, Express middleware) |
| `shared/` | Shared TypeScript types and API contracts |
| `orders-service/` | Orders microservice [planned] |

## Prerequisites

- Node.js 20+
- npm 10+

## Setup

```bash
npm install
npm run build:shared
npm run build --workspace @chatbot/server-utils
```

Copy env files from each package’s `.env.example` (chat, gateway, catalog). Set `SERVICE_NAME` to `CHAT` | `GATEWAY` | `CATALOG` as appropriate. Never commit `.env` files.

## Development

Typical local stack (separate terminals):

```bash
npm run dev --workspace @chatbot/catalog    # http://localhost:3003
npm run dev:server                         # http://localhost:3001
npm run dev --workspace gateway            # http://localhost:3000  (public)
npm run dev:client                         # http://localhost:4200
```

`predev` on chat/catalog/gateway builds `shared` and (where needed) `server-utils` automatically.

Verify:

```bash
curl http://localhost:3000/health          # gateway
curl http://localhost:3001/health          # chat
curl http://localhost:3003/health          # catalog
curl "http://localhost:3003/categories"
```

Angular `API_URL` points at the gateway (`http://localhost:3000`).

## Build

```bash
npm run build
```

## Architecture

**Tool-Gate pattern:** the chat endpoint accepts authenticated and unauthenticated traffic later; authorization is enforced inside tool handlers, with UI escalation on `AUTH_REQUIRED`.

**Current layout:**

```
Angular → Gateway :3000
            └── POST /chat → Chat :3001
                               └── tools → Catalog :3003
```

**Next:** orders domain + Jest, then `orders-service` :3002 and gateway `/orders`.

See [AGENTS.md](./AGENTS.md) for the full milestone plan and conventions.
