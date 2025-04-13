import { FastMCP } from 'fastmcp';
import { BuuFunServerClient } from 'buu-server-sdk';
import { ThreadsGetAllParamsSchema } from '../types/Thread';

export const registerThreadTools = (server: FastMCP, createClient: () => BuuFunServerClient) => {
  const client = createClient();

  server.addTool({
    name: 'threads_get_all',
    description: "Get all user's threads",
    parameters: ThreadsGetAllParamsSchema,
    execute: async ({ pagination, filters }) => {
      const response = await client.thread.getAll({ pagination, filters });

      return JSON.stringify(response);
    },
  });
};
