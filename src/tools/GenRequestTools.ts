import { z } from 'zod';
import { gql, GraphQLClient } from 'graphql-request';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

const generateImageQuery = gql`
  mutation GenerateImage($subthreadId: String!) {
    generateImage(subthreadId: $subthreadId) {
      ... on GenRequest {
        _id
        subthreadId
        teamId
        status
        metadata
        type
        images {
          alt
          keyS3
          size
          type
          url
        }
        model_mesh {
          alt
          keyS3
          size
          type
          url
        }
        timings {
          inference
        }
        credits
        createdAt
        updatedAt
        address
      }
      ... on HandledError {
        code
        message
      }
    }
  }
`;

const generateModelQuery = gql`
  mutation GenerateModel($imageUrl: String!, $subthreadId: String!, $imageRequestId: String) {
    generateModel(imageUrl: $imageUrl, subthreadId: $subthreadId, imageRequestId: $imageRequestId) {
      ... on GenRequest {
        _id
        subthreadId
        teamId
        status
        metadata
        type
        images {
          alt
          keyS3
          size
          type
          url
        }
        model_mesh {
          alt
          keyS3
          size
          type
          url
        }
        timings {
          inference
        }
        credits
        createdAt
        updatedAt
        address
      }
      ... on HandledError {
        code
        message
      }
    }
  }
`;

const getSubthreadGenRequestsQuery = gql`
  query GetSubthreadGenRequests($subthreadId: String!) {
    getSubthreadGenRequests(subthreadId: $subthreadId) {
      ... on GenRequestsPage {
        items {
          _id
          subthreadId
          teamId
          status
          metadata
          type
          images {
            alt
            keyS3
            size
            type
            url
          }
          model_mesh {
            alt
            keyS3
            size
            type
            url
          }
          timings {
            inference
          }
          credits
          createdAt
          updatedAt
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

export const registerGenRequestTools = (server: McpServer, client: GraphQLClient) => {
  server.tool(
    'generate_image',
    '[PRIVATE] - Generate image',
    {
      subthreadId: z.string().describe('Subthread ID used to generate the image'),
    },
    async ({ subthreadId }) => {
      try {
        const response = await client.request(generateImageQuery, { subthreadId });
        return { content: [{ type: 'text', text: JSON.stringify(response) }] };
      } catch (error) {
        console.error('Error calling generate_image:', error);
        return {
          isError: true,
          content: [
            {
              type: 'text',
              text: `Error: Failed to generate image. ${error}`,
            },
          ],
        };
      }
    }
  );

  server.tool(
    'generate_model',
    '[PRIVATE] - Generate model.',
    {
      imageRequestId: z
        .string()
        .optional()
        .describe('Optional ID of a previously generated image request'),
      imageUrl: z.string().describe('Image URL used to generate the model'),
      subthreadId: z.string().describe('Subthread ID where the model will be linked'),
    },
    async ({ imageRequestId, subthreadId, imageUrl }) => {
      try {
        const response = await client.request(generateModelQuery, {
          imageUrl,
          subthreadId,
          imageRequestId,
        });
        return { content: [{ type: 'text', text: JSON.stringify(response) }] };
      } catch (error) {
        console.error('Error calling generate_model:', error);
        return {
          isError: true,
          content: [
            {
              type: 'text',
              text: `Error: Failed to generate model. ${error}`,
            },
          ],
        };
      }
    }
  );

  server.tool(
    'genrequest_get_all',
    "[PRIVATE] - Get all team's GenRequests by subthread ID",
    {
      subthreadId: z.string().describe('Subthread ID to retrieve all associated GenRequests'),
    },
    async ({ subthreadId }) => {
      try {
        const response = await client.request(getSubthreadGenRequestsQuery, {
          subthreadId,
        });
        return { content: [{ type: 'text', text: JSON.stringify(response) }] };
      } catch (error) {
        console.error('Error calling genrequest_get_all:', error);
        return {
          isError: true,
          content: [
            {
              type: 'text',
              text: `Error: Failed to retrieve GenRequests. ${error}`,
            },
          ],
        };
      }
    }
  );
};
