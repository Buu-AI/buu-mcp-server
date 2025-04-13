import { FastMCP } from 'fastmcp';
import { BuuFunServerClient } from 'buu-server-sdk';
import { registerTeamTools } from './tools/TeamTools';
import { registerThreadTools } from './tools/ThreadTools';
import { registerSubthreadTools } from './tools/SubthreadTools';
import { registerGenRequestTools } from './tools/GenRequestTools';

const server = new FastMCP({
  name: 'buu-mcp-server',
  version: '0.0.1',
});

const createClient = (session?: any) =>
  new BuuFunServerClient({
    endpoint: process.env['BUU_SERVER_URL']!,
    authorization: session?.authorization || {
      apiKey: process.env['TEAM_API_KEY']!,
    },
  });

registerTeamTools(server, createClient);
registerThreadTools(server, createClient);
registerSubthreadTools(server, createClient);
registerGenRequestTools(server, createClient);

// Start the MCP server
async function main() {
  try {
    await server.start({ transportType: 'stdio' });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

main();
