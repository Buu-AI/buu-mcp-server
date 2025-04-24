import { z } from 'zod';
import { gql, GraphQLClient } from 'graphql-request';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { processStreamingResponse } from '../utils/shared.js';

// Full Queries / Mutations with all fields

const createTeamMutation = gql`
  mutation CreateTeam($name: String!) {
    createTeam(name: $name) {
      ... on Team {
        _id
        type
        name
        creator
        wallet
        members {
          address
          role
          status
        }
        available
        pending
        confirmed
        updatedAt
        createdAt
      }
      ... on HandledError {
        code
        message
      }
    }
  }
`;

const addTeamMemberMutation = gql`
  mutation Mutation($member: String!) {
    addTeamMember(member: $member) {
      ... on Team {
        _id
        type
        name
        creator
        wallet
        members {
          address
          role
          status
        }
        available
        pending
        confirmed
        updatedAt
        createdAt
      }
      ... on HandledError {
        code
        message
      }
    }
  }
`;

const removeTeamMemberMutation = gql`
  mutation RemoveTeamMember($member: String!) {
    removeTeamMember(member: $member) {
      ... on Team {
        _id
        type
        name
        creator
        wallet
        members {
          address
          role
          status
        }
        available
        pending
        confirmed
        updatedAt
        createdAt
      }
      ... on HandledError {
        code
        message
      }
    }
  }
`;

const updateTeamDataMutation = gql`
  mutation UpdateTeamData($name: String, $wallet: String) {
    updateTeamData(name: $name, wallet: $wallet) {
      ... on Team {
        _id
        type
        name
        creator
        wallet
        members {
          address
          role
          status
        }
        available
        pending
        confirmed
        updatedAt
        createdAt
      }
      ... on HandledError {
        code
        message
      }
    }
  }
`;

const updateTeamMemberRoleMutation = gql`
  mutation UpdateTeamMemberRole($newRole: TeamRole!, $member: String!) {
    updateTeamMemberRole(newRole: $newRole, member: $member) {
      ... on Team {
        _id
        type
        name
        creator
        wallet
        members {
          address
          role
          status
        }
        available
        pending
        confirmed
        updatedAt
        createdAt
      }
      ... on HandledError {
        code
        message
      }
    }
  }
`;

const getTeamQuery = gql`
  query GetTeam {
    getTeam {
      ... on Team {
        _id
        type
        name
        creator
        wallet
        members {
          address
          role
          status
        }
        available
        pending
        confirmed
        updatedAt
        createdAt
      }
      ... on HandledError {
        code
        message
      }
    }
  }
`;

const getUserTeamsQuery = gql`
  query TeamPage($pagination: Pagination, $filters: TeamFilter) {
    getUserTeams(pagination: $pagination, filters: $filters) {
      ... on TeamPage {
        items {
          _id
          type
          name
          creator
          wallet
          members {
            address
            role
            status
          }
          available
          pending
          confirmed
          updatedAt
          createdAt
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

export const registerTeamTools = (server: McpServer, client: GraphQLClient) => {
  server.tool(
    'team_create',
    '[PRIVATE] Create a new team for the logged-in user.',
    {
      name: z.string().describe('The name of the new team'),
    },
    async ({ name }) => {
      try {
        const response = await client.request(createTeamMutation, { name });
        const result = await processStreamingResponse(response);
        return { content: [{ type: 'text', text: result }] };
      } catch (error) {
        console.error('Error calling team_create:', error);
        return {
          isError: true,
          content: [{ type: 'text', text: `Error: Failed to create team. ${error}` }],
        };
      }
    }
  );

  server.tool(
    'team_add_member',
    '[PRIVATE] Add a new member to the team.',
    {
      member: z.string().describe('Address of the new team member'),
    },
    async ({ member }) => {
      try {
        const response = await client.request(addTeamMemberMutation, { member });
        const result = await processStreamingResponse(response);
        return { content: [{ type: 'text', text: result }] };
      } catch (error) {
        console.error('Error calling team_add_member:', error);
        return {
          isError: true,
          content: [{ type: 'text', text: `Error: Failed to add team member. ${error}` }],
        };
      }
    }
  );

  server.tool(
    'team_remove_member',
    '[PRIVATE] Remove a member from the team.',
    {
      member: z.string().describe('Address of the team member to remove'),
    },
    async ({ member }) => {
      try {
        const response = await client.request(removeTeamMemberMutation, { member });
        const result = await processStreamingResponse(response);
        return { content: [{ type: 'text', text: result }] };
      } catch (error) {
        console.error('Error calling team_remove_member:', error);
        return {
          isError: true,
          content: [{ type: 'text', text: `Error: Failed to remove team member. ${error}` }],
        };
      }
    }
  );

  server.tool(
    'team_update',
    '[PRIVATE] Update team data.',
    {
      name: z.string().optional().describe('New name for the team'),
      wallet: z.string().optional().describe('New wallet address for the team'),
    },
    async ({ name, wallet }) => {
      try {
        const response = await client.request(updateTeamDataMutation, { name, wallet });
        const result = await processStreamingResponse(response);
        return { content: [{ type: 'text', text: result }] };
      } catch (error) {
        console.error('Error calling team_update:', error);
        return {
          isError: true,
          content: [{ type: 'text', text: `Error: Failed to update team. ${error}` }],
        };
      }
    }
  );

  server.tool(
    'team_update_member_role',
    '[PRIVATE] Update the role of a team member.',
    {
      member: z.string().describe('Address of the team member'),
      newRole: z.string().describe('New role for the team member'),
    },
    async ({ member, newRole }) => {
      try {
        const response = await client.request(updateTeamMemberRoleMutation, {
          member,
          newRole,
        });
        const result = await processStreamingResponse(response);
        return { content: [{ type: 'text', text: result }] };
      } catch (error) {
        console.error('Error calling team_update_member_role:', error);
        return {
          isError: true,
          content: [{ type: 'text', text: `Error: Failed to update member role. ${error}` }],
        };
      }
    }
  );

  server.tool(
    'team_get',
    '[PRIVATE] Get the personal team for the current user.',
    {
      pagination: z.any().describe('Pagination settings'),
      filters: z.any().describe('Pagination settings'),
    },
    async () => {
      try {
        const response = await client.request(getTeamQuery);
        const result = await processStreamingResponse(response);
        return { content: [{ type: 'text', text: result }] };
      } catch (error) {
        console.error('Error calling team_get:', error);
        return {
          isError: true,
          content: [{ type: 'text', text: `Error: Failed to retrieve team. ${error}` }],
        };
      }
    }
  );

  server.tool(
    'team_get_all',
    '[PRIVATE] Get all teams for the current user.',
    {
      pagination: z.any().optional().describe('Pagination settings for querying threads'),
      filters: z.any().optional().describe('Filter criteria to narrow down thread results'),
    },
    async ({ pagination, filters }) => {
      try {
        const response = await client.request(getUserTeamsQuery, { pagination, filters });
        const result = await processStreamingResponse(response);
        return { content: [{ type: 'text', text: result }] };
      } catch (error) {
        console.error('Error calling team_get_all:', error);
        return {
          isError: true,
          content: [{ type: 'text', text: `Error: Failed to retrieve all teams. ${error}` }],
        };
      }
    }
  );
};
