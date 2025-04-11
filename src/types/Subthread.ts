import { z } from "zod";
import { PaginationSchema } from "./shared";

export const SubthreadFilterSchema = z.object({
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
  teamId_eq: z.string().optional(),
  teamId_in: z.array(z.string()).optional(),
  teamId_ne: z.string().optional(),
  teamId_nin: z.array(z.string()).optional(),
  threadId_eq: z.string().optional(),
  threadId_in: z.array(z.string()).optional(),
  threadId_ne: z.string().optional(),
  threadId_nin: z.array(z.string()).optional(),
  updatedAt_eq: z.string().datetime().optional(),
  updatedAt_gt: z.string().datetime().optional(),
  updatedAt_gte: z.string().datetime().optional(),
  updatedAt_lt: z.string().datetime().optional(),
  updatedAt_lte: z.string().datetime().optional(),
  updatedAt_ne: z.string().datetime().optional(),
});

export const SubthreadGenerateParamsSchema = z.object({
  style: z.any().optional().describe("Optional style input for subthread generation"),
  prompt: z.string().optional().describe("Optional prompt text"),
  imageUrl: z.string().optional().describe("Optional URL of the image"),
  strength: z.number().optional().describe("Optional strength value for image influence"),
  threadId: z.string().optional().describe("Optional thread ID"),
});

export const SubthreadGetParamsSchema = z.object({
  subthreadId: z.string().describe("ID of the subthread to fetch"),
});

export const SubthreadGetAllParamsSchema = z.object({
  pagination: PaginationSchema.describe("Pagination input for subthread query"),
  filters: SubthreadFilterSchema.describe("Filter options for subthread query"),
});
