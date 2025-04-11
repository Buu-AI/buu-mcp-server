import { z } from "zod";
import { TeamRole } from "buu-server-sdk/dist/types";

export const TeamFilterSchema = z.object({
  _id_eq: z.string().optional(),
  _id_in: z.array(z.string()).optional(),
  _id_ne: z.string().optional(),
  _id_nin: z.array(z.string()).optional(),
  createdAt_eq: z.string().datetime().optional(),
  createdAt_gt: z.string().datetime().optional(),
  createdAt_gte: z.string().datetime().optional(),
  createdAt_lt: z.string().datetime().optional(),
  createdAt_lte: z.string().datetime().optional(),
  createdAt_ne: z.string().datetime().optional(),
  creator_eq: z.string().optional(),
  creator_in: z.array(z.string()).optional(),
  creator_ne: z.string().optional(),
  creator_nin: z.array(z.string()).optional(),
  type_eq: z.string().optional(),
});

export const TeamCreateParamsSchema = z.object({
  name: z.string().describe("The name of the new team"),
});

export const TeamAddMemberParamsSchema = z.object({
  member: z.string().describe("Address of the new team member"),
});

export const TeamRemoveMemberParamsSchema = z.object({
  member: z.string().describe("Address of the team member to remove"),
});

export const TeamUpdateParamsSchema = z.object({
  name: z.string().optional().describe("New name for the team"),
  wallet: z.string().optional().describe("New wallet address for the team"),
});

export const TeamUpdateMemberRoleParamsSchema = z.object({
  member: z.string().describe("Address of the team member"),
  newRole: z.nativeEnum(TeamRole).describe("New role for the team member"),
});

export const TeamGetAllParamsSchema = z.object({
  pagination: z.any().describe("Pagination settings"),
  filters: TeamFilterSchema.describe("Filter options for team query"),
});
