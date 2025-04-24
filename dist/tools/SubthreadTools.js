import { z } from 'zod';
import { gql } from 'graphql-request';
const generateSubthreadMutation = gql `
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
const getSubthreadQuery = gql `
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
const getSubthreadsQuery = gql `
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
export var SubthreadStyle;
(function (SubthreadStyle) {
    SubthreadStyle[SubthreadStyle["Realistic"] = 0] = "Realistic";
    SubthreadStyle[SubthreadStyle["LowPoly"] = 1] = "LowPoly";
    SubthreadStyle[SubthreadStyle["Voxel"] = 2] = "Voxel";
    SubthreadStyle[SubthreadStyle["Stylized"] = 3] = "Stylized";
    SubthreadStyle[SubthreadStyle["Toon"] = 4] = "Toon";
    SubthreadStyle[SubthreadStyle["SciFi"] = 5] = "SciFi";
    SubthreadStyle[SubthreadStyle["Fantasy"] = 6] = "Fantasy";
    SubthreadStyle[SubthreadStyle["Wireframe"] = 7] = "Wireframe";
    SubthreadStyle[SubthreadStyle["Clay"] = 8] = "Clay";
    SubthreadStyle[SubthreadStyle["Metallic"] = 9] = "Metallic";
    SubthreadStyle[SubthreadStyle["Cute"] = 10] = "Cute";
    SubthreadStyle[SubthreadStyle["Isometric"] = 11] = "Isometric";
    SubthreadStyle[SubthreadStyle["Weapons"] = 12] = "Weapons";
    SubthreadStyle[SubthreadStyle["Environment"] = 13] = "Environment";
})(SubthreadStyle || (SubthreadStyle = {}));
export const registerSubthreadTools = (server, client) => {
    server.tool('subthread_generate', '[PRIVATE] Generates a new subthread.', {
        style: z
            .nativeEnum(SubthreadStyle)
            .optional()
            .describe('Optional style input for subthread generation'),
        prompt: z.string().optional().describe('Optional prompt text'),
    }, async ({ style, prompt }) => {
        try {
            const response = await client.request(generateSubthreadMutation, {
                style,
                prompt,
            });
            return { content: [{ type: 'text', text: JSON.stringify(response) }] };
        }
        catch (error) {
            console.error('Error calling subthread_generate:', error);
            return {
                isError: true,
                content: [{ type: 'text', text: `Error: Failed to generate subthread. ${error}` }],
            };
        }
    });
    server.tool('subthread_get', "[PRIVATE] Get team's subthread by ID.", {
        subthreadId: z.string().describe('ID of the subthread to fetch'),
    }, async ({ subthreadId }) => {
        try {
            const response = await client.request(getSubthreadQuery, { subthreadId });
            return { content: [{ type: 'text', text: JSON.stringify(response) }] };
        }
        catch (error) {
            console.error('Error calling subthread_get:', error);
            return {
                isError: true,
                content: [{ type: 'text', text: `Error: Failed to retrieve subthread. ${error}` }],
            };
        }
    });
    server.tool('subthread_get_all', "[PRIVATE] Get all team's subthreads.", {
        pagination: z.any().optional().describe('Pagination settings for querying threads'),
        filters: z.any().optional().describe('Filter criteria to narrow down thread results'),
    }, async ({ pagination, filters }) => {
        try {
            const response = await client.request(getSubthreadsQuery, { pagination, filters });
            return { content: [{ type: 'text', text: JSON.stringify(response) }] };
        }
        catch (error) {
            console.error('Error calling subthread_get_all:', error);
            return {
                isError: true,
                content: [{ type: 'text', text: `Error: Failed to retrieve subthreads. ${error}` }],
            };
        }
    });
};
