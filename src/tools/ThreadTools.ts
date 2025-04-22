import { z } from 'zod';
import { gql, GraphQLClient } from 'graphql-request';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { processStreamingResponse } from '../utils/shared.js';

const BUU_SERVER_URL = new GraphQLClient(
  process.env.BUU_SERVER_URL || 'https://apollo-gateway-sandbox.up.railway.app/graphql'
);

const getThreadsQuery = gql`
  query GetThreads($pagination: Pagination, $filters: ThreadFilter) {
    getThreads(pagination: $pagination, filters: $filters) {
      ... on ThreadsPage {
        items {
          _id
          createdAt
          updatedAt
          teamId
          title
          style
          address
        }
        metadata {
          limit
          offset
          orderBy
          orderDirection
          numElements
          total
          page
          pages
        }
      }
      ... on HandledError {
        code
        message
      }
    }
  }
`;

export const registerThreadTools = (server: McpServer) => {
  server.tool(
    'threads_get_all',
    "Get all user's threads",
    {
      pagination: z.any().optional().describe('Pagination settings for querying threads'),
      filters: z.any().optional().describe('Filter criteria to narrow down thread results'),
    },
    async ({ pagination, filters }) => {
      try {
        const response = await BUU_SERVER_URL.request(getThreadsQuery, { pagination, filters });
        const result = await processStreamingResponse(response);
        return {
          content: [
            {
              type: 'text',
              text: result,
            },
          ],
        };
      } catch (error) {
        console.error('Error calling threads_get_all:', error);
        return {
          isError: true,
          content: [
            {
              type: 'text',
              text: `Error: Failed to retrieve threads. ${error}`,
            },
          ],
        };
      }
    }
  );
};
