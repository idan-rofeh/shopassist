# ChatBot

Monorepo for learning server-controlled, tool-gated chatbot architecture with Angular, Node.js, and the Gemini API.

> **For AI agents:** read [AGENTS.md](./AGENTS.md) at the start of every session for project context, conventions, and milestone status.

## Structure

| Package | Description |
|---------|-------------|
| `client/` | Angular frontend with a minimal chat UI shell |
| `server/` | Express + TypeScript API (`GET /health`) |
| `shared/` | Shared TypeScript types used by client and server |

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
npm run dev:server   # http://localhost:3000
npm run dev:client   # http://localhost:4200
```

Verify the API:

```bash
curl http://localhost:3000/health
```

## Build

```bash
npm run build
```

## Architecture (planned)

Authentication and data access will use a **Tool-Gate** pattern: the chat endpoint accepts both authenticated and unauthenticated requests; authorization is enforced inside individual tool handlers on the server, with the UI escalating to a login form when a tool returns `AUTH_REQUIRED`.
