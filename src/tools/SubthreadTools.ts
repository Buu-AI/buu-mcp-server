import { z } from 'zod';
import { gql, GraphQLClient } from 'graphql-request';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { processStreamingResponse } from '../utils/shared.js';

const generateSubthreadMutation = gql`
  mutation GenerateSubthread($style: JSON, $prompt: String) {
    generateSubthread(style: $style, prompt: $prompt) {
      ... on Subthread {
        _id
        createdAt
        updatedAt
        teamId
        threadId
        prompt
        style
        imageUrl
        strength
        address
      }
      ... on HandledError {
        code
        message
      }
    }
  }
`;

const getSubthreadQuery = gql`
  query Subthread($subthreadId: String!) {
    getSubthread(subthreadId: $subthreadId) {
      ... on Subthread {
        _id
        createdAt
        updatedAt
        teamId
        threadId
        prompt
        style
        imageUrl
        strength
        address
      }
      ... on HandledError {
        code
        message
      }
    }
  }
`;

const getSubthreadsQuery = gql`
  query GetSubthreads($pagination: Pagination, $filters: SubthreadFilter) {
    getSubthreads(pagination: $pagination, filters: $filters) {
      ... on SubthreadsPage {
        items {
          _id
          createdAt
          updatedAt
          teamId
          threadId
          prompt
          style
          imageUrl
          strength
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

export enum SubthreadStyle {
  Realistic = 'realistic',
  LowPoly = 'lowPoly',
  Voxel = 'voxel',
  Stylized = 'stylized',
  Toon = 'toon',
  SciFi = 'sciFi',
  Fantasy = 'fantasy',
  Wireframe = 'wireframe',
  Clay = 'clay',
  Metallic = 'metallic',
  Cute = 'cute',
  Isometric = 'isometric',
  Weapons = 'weapons',
  Environment = 'environment',
}

export const registerSubthreadTools = (server: McpServer, client: GraphQLClient) => {
  server.tool(
    'subthread_generate',
    '[PRIVATE] Generates a new subthread.',
    {
      style: z
        .nativeEnum(SubthreadStyle)
        .optional()
        .describe('Optional style input for subthread generation'),
      prompt: z.string().optional().describe('Optional prompt text'),
    },
    async ({ style, prompt }) => {
      try {
        const response = await client.request(generateSubthreadMutation, {
          style,
          prompt,
        });
        const result = await processStreamingResponse(response);
        return {
          content: [{ type: 'text', text: result }],
        };
      } catch (error) {
        console.error('Error calling subthread_generate:', error);
        return {
          isError: true,
          content: [{ type: 'text', text: `Error: Failed to generate subthread. ${error}` }],
        };
      }
    }
  );

  server.tool(
    'subthread_get',
    "[PRIVATE] Get team's subthread by ID.",
    {
      subthreadId: z.string().describe('ID of the subthread to fetch'),
    },
    async ({ subthreadId }) => {
      try {
        const response = await client.request(getSubthreadQuery, { subthreadId });
        const result = await processStreamingResponse(response);
        return {
          content: [{ type: 'text', text: result }],
        };
      } catch (error) {
        console.error('Error calling subthread_get:', error);
        return {
          isError: true,
          content: [{ type: 'text', text: `Error: Failed to retrieve subthread. ${error}` }],
        };
      }
    }
  );

  server.tool(
    'subthread_get_all',
    "[PRIVATE] Get all team's subthreads.",
    {
      pagination: z.any().optional().describe('Pagination settings for querying threads'),
      filters: z.any().optional().describe('Filter criteria to narrow down thread results'),
    },
    async ({ pagination, filters }) => {
      try {
        const response = await client.request(getSubthreadsQuery, { pagination, filters });
        const result = await processStreamingResponse(response);
        return {
          content: [{ type: 'text', text: result }],
        };
      } catch (error) {
        console.error('Error calling subthread_get_all:', error);
        return {
          isError: true,
          content: [{ type: 'text', text: `Error: Failed to retrieve subthreads. ${error}` }],
        };
      }
    }
  );
};
