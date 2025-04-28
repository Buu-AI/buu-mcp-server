# Buu AI MCP Server 

## Overview

This server acts as a command execution gateway for the Buu platform, exposing tools to manage teams, subthreads, and generation requests using a standardized MCP interface.

---

## Features

- Connects to the Buu GraphQL server
- Supports Team, Subthread and GenRequest operations
- Enables generation request handling
- Authenticates with API key
- Communicates via `stdio` transport (ideal for CLI or tool embedding)

---

## Client Installation Instructions

#### Running on Claude Desktop

To configure Octagon MCP for Claude Desktop:

```bash
npx -y @smithery/cli@latest install @OctagonAI/octagon-mcp-server --client claude
```

---

## Configuration

### Environment Variables

#### Required

- `BUU_TEAM_API_KEY`: Your Buu AI team API key
  - Required for all operations

#### Optional

- `BUU_SERVER_URL`: Buu API URL
  - By default uses the sandbox environment

## Tool Registration

### 1. TeamTools

- `team_create` — Create a new team
- `team_add_member` — Add a member to a team
- `team_remove_member` — Remove a member from a team
- `team_update` — Update team data
- `team_update_member_role` — Update member role
- `team_get` — Get the personal team for the current user
- `team_get_all` — Get all teams for the current user

### 3. SubthreadTools

- `subthread_generate` — Generate a subthread for a Thread
- `subthread_get` — Get subthread by ID
- `subthread_get_all` — Get all team's subthread

### 4. GenRequestTools

- `generate_image` — Generate image for a subthread 
- `generate_model` — Generate 3D model for subthread 
- `genrequest_get_all` — Get all GenRequests for a specific subthread

<a href="https://glama.ai/mcp/servers/@Buu-AI/buu-mcp-server">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@Buu-AI/buu-mcp-server/badge" />
</a>
