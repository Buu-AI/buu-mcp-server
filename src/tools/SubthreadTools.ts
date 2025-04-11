import { FastMCP } from 'fastmcp';
import { BuuFunServerClient } from 'buu-server-sdk';
import {
  SubthreadGenerateParamsSchema,
  SubthreadGetAllParamsSchema,
  SubthreadGetParamsSchema,
} from '../types/Subthread';

export const registerSubthreadTools = (server: FastMCP, client: BuuFunServerClient) => {
  server.addTool({
    name: 'subthread_generate',
    description: '[PRIVATE] Generates a new subthread.',
    parameters: SubthreadGenerateParamsSchema,
    execute: async ({ style, prompt, imageUrl, strength, threadId }) => {
      const response = await client.subthread.generate({
        style,
        prompt,
        imageUrl,
        strength,
        threadId,
      });

      return JSON.stringify(response);
    },
  });

  server.addTool({
    name: 'subthread_get',
    description: "[PRIVATE] Get team's subthread by ID.",
    parameters: SubthreadGetParamsSchema,
    execute: async (args) => {
      const response = await client.subthread.get({ subthreadId: args.subthreadId });

      return JSON.stringify(response);
    },
  });

  server.addTool({
    name: 'subthread_get_all',
    description: "[PRIVATE] Get all team's subthreads.",
    parameters: SubthreadGetAllParamsSchema,
    execute: async ({ pagination, filters }) => {
      const response = await client.subthread.getAll({ pagination, filters });

      return JSON.stringify(response);
    },
  });
};
