#!/usr/bin/env node

import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerGenRequestTools } from './tools/GenRequestTools.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJsonContent = await readFile(packageJsonPath, 'utf8');
const packageInfo = JSON.parse(packageJsonContent) as { name: string; version: string };

dotenv.config();

const BUU_TEAM_API_KEY = process.env.BUU_TEAM_API_KEY;

if (!BUU_TEAM_API_KEY) {
  console.error('Error: BUU_TEAM_API_KEY is not set in the environment variables');
  console.error(
    "Please set the BUU_TEAM_API_KEY environment variable or use 'env BUU_TEAM_API_KEY=your_key npx -y buu-server-mcp'"
  );
  process.exit(1);
}

const server = new McpServer({
  name: packageInfo.name,
  version: packageInfo.version,
});

registerGenRequestTools(server);

// Start the MCP server
async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('Server started succesfully');
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

main();
