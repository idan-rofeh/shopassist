# ChatBot / Order Desk

Monorepo for learning server-controlled, tool-gated chatbot architecture with Angular, Node.js, Gemini, and microservices.

> **For AI agents:** read [AGENTS.md](./AGENTS.md) at the start of every session for project context, conventions, and milestone status.

## Structure

| Package | Description |
|---------|-------------|
| `client/` | Angular frontend with chat UI |
| `server/` | Chat / catalog service (Gemini, tools, products) |
| `shared/` | Shared TypeScript types and API contracts |
| `gateway/` | API gateway — public entrance [planned] |
| `orders-service/` | Orders microservice [planned] |

## Prerequisites

- Node.js 20+
- npm 10+

## Setup

```bash
npm install
npm run build:shared
```

Copy environment variables for the server:

```bash
cp server/.env.example server/.env
```

## Development

Run the API and Angular dev server in separate terminals:

```bash
npm run dev:server   # chat service — http://localhost:3000 (will move to :3001 behind gateway)
npm run dev:client   # http://localhost:4200
```

Verify the API:

```bash
curl http://localhost:3000/health
```

When the gateway and orders service are added:

```bash
# npm run dev:gateway   # http://localhost:3000 — public entrance
# npm run dev:orders    # http://localhost:3002
```

## Build

```bash
npm run build
```

## Architecture

**Tool-Gate pattern:** the chat endpoint accepts both authenticated and unauthenticated requests; authorization is enforced inside individual tool handlers on the server, with the UI escalating to a login form when a tool returns `AUTH_REQUIRED`.

**Target layout (with microservices):**

```
Angular → Gateway :3000
            ├── POST /chat    → Chat service :3001
            └── GET  /orders  → Orders service :3002

Chat service (order tools) → Orders service :3002  (internal)
```

See [AGENTS.md](./AGENTS.md) for the full milestone plan and conventions.
