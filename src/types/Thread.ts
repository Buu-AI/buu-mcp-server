import { z } from 'zod';
import { PaginationSchema } from './shared';

// ThreadFilter schema
export const ThreadFilterSchema = z.object({
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

  updatedAt_eq: z.string().datetime().optional(),
  updatedAt_gt: z.string().datetime().optional(),
  updatedAt_gte: z.string().datetime().optional(),
  updatedAt_lt: z.string().datetime().optional(),
  updatedAt_lte: z.string().datetime().optional(),
  updatedAt_ne: z.string().datetime().optional(),
});

// threads_get_all parameters
export const ThreadsGetAllParamsSchema = z.object({
  pagination: PaginationSchema.optional().describe('Pagination settings for querying threads'),
  filters: ThreadFilterSchema.optional().describe('Filter criteria to narrow down thread results'),
});
