# Buu MCP Server

## Overview

This server acts as a command execution gateway for the Buu platform, exposing tools to manage teams, threads, subthreads, and generation requests using a standardized MCP interface.

---

## Features

- Connects to the Buu GraphQL server
- Supports team and thread operations
- Enables generation request handling
- Authenticates with API key or session token
- Communicates via `stdio` transport (ideal for CLI or tool embedding)

---

## Environment Variables

```bash
BUU_SERVER_URL=https://your-buu-server/graphql
TEAM_API_KEY=your-api-key
```

---

## Running the Server

```bash
node dist/index.js
```

> The server starts using the `stdio` transport. It listens for commands and responds in MCP protocol format.

---

## Tool Registration

### 1. TeamTools

- `team_create` — Create a new team
- `team_add_member` — Add a member to a team
- `team_remove_member` — Remove a member from a team
- `team_update` — Update team data
- `team_update_member_role` — Update member role
- `team_get` — Get the personal team for the current user
- `team_get_all` — Get all teams for the current user

### 2. ThreadTools

- `threads_get_all` — Get all user's threads

### 3. SubthreadTools

- `subthread_generate` — Generate a subthread for a Thread
- `subthread_get` — Get subthread by ID
- `subthread_get_all` — Get all team's subthread

### 4. GenRequestTools

- `generate_image` — Generate image for a subthread 
- `generate_model` — Generate 3D model for subthread 
- `genrequest_get_all` — Get all GenRequests for a specific subthread

---

## Authentication

The server uses either:

- A `TEAM_API_KEY` from env to log in

---

## Claude Integration (MCP Inspector)

To configure this MCP server for use in Claude:

```json
{
  "mcpServers": {
    "buu-server": {
      "command": "node",
      "args": ["dist/index.js"],
      "transport": "stdio",
      "env": {
        "BUU_SERVER_URL": "https://your-buu-server/graphql",
        "TEAM_API_KEY": "your-api-key"
      }
    }
  }
}
```

> You can add this configuration to your Claude MCP Inspector under **Settings > MCP Servers**.

---

## License

MIT
