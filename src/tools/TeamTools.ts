import { z } from 'zod';
import { FastMCP } from 'fastmcp';
import { BuuFunServerClient } from 'buu-server-sdk';
import {
  TeamAddMemberParamsSchema,
  TeamCreateParamsSchema,
  TeamGetAllParamsSchema,
  TeamRemoveMemberParamsSchema,
  TeamUpdateMemberRoleParamsSchema,
  TeamUpdateParamsSchema,
} from '../types/Team';

export const registerTeamTools = (server: FastMCP, createClient: () => BuuFunServerClient) => {
  const client = createClient();

  server.addTool({
    name: 'team_create',
    description: '[PRIVATE] Create a new team for the logged-in user.',
    parameters: TeamCreateParamsSchema,
    execute: async ({ name }) => {
      const response = await client.team.create({ name });
      return JSON.stringify(response);
    },
  });

  server.addTool({
    name: 'team_add_member',
    description: '[PRIVATE] Add a new member to the team.',
    parameters: TeamAddMemberParamsSchema,
    execute: async ({ member }) => {
      const response = await client.team.addMember({ member });
      return JSON.stringify(response);
    },
  });

  server.addTool({
    name: 'team_remove_member',
    description: '[PRIVATE] Remove a member from the team.',
    parameters: TeamRemoveMemberParamsSchema,
    execute: async ({ member }) => {
      const response = await client.team.removeMember({ member });
      return JSON.stringify(response);
    },
  });

  server.addTool({
    name: 'team_update',
    description: '[PRIVATE] Update team data.',
    parameters: TeamUpdateParamsSchema,
    execute: async ({ name, wallet }) => {
      const response = await client.team.update({ name, wallet });
      return JSON.stringify(response);
    },
  });

  server.addTool({
    name: 'team_update_member_role',
    description: '[PRIVATE] Update the role of a team member.',
    parameters: TeamUpdateMemberRoleParamsSchema,
    execute: async ({ member, newRole }) => {
      const response = await client.team.updateMemberRole({ member, newRole });
      return JSON.stringify(response);
    },
  });

  server.addTool({
    name: 'team_get',
    description: '[PRIVATE] Get the personal team for the current user.',
    parameters: z.object({}),
    execute: async (_args) => {
      const response = await client.team.get();
      return JSON.stringify(response);
    },
  });

  server.addTool({
    name: 'team_get_all',
    description: '[PRIVATE] Get all teams for the current user.',
    parameters: TeamGetAllParamsSchema,
    execute: async ({ pagination, filters }) => {
      const response = await client.team.getUserTeams({ pagination, filters });
      return JSON.stringify(response);
    },
  });
};
