import { FastMCP } from "fastmcp";
import { registerTeamTools } from "./tools/TeamTools";
import { registerThreadTools } from "./tools/ThreadTools";
import { registerSubthreadTools } from "./tools/SubthreadTools";
import { registerGenRequestTools } from "./tools/GenRequestTools";
import { BuuFunServerClient } from "buu-server-sdk";

const server = new FastMCP({
  name: "buu-mcp-server",
  version: "0.0.1",
});

const client = new BuuFunServerClient({
  endpoint: "http://localhost:4002/graphql",
  authorization: {
    apiKey: process.env['TEAM_API_KEY']!
  }
});

registerTeamTools(server, client);
registerThreadTools(server, client);
registerSubthreadTools(server, client);
registerGenRequestTools(server, client);

// Start the MCP server
async function main() {
  try {
    await server.start({ transportType: "stdio" });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

main();

