import { z } from "zod";
import { OrderDirection } from "buu-server-sdk/dist/types";

export const PaginationSchema = z.object({
  limit: z.number().int().optional().describe("Maximum number of items to return"),
  offset: z.number().int().optional().describe("Number of items to skip"),
  orderBy: z.string().optional().describe("Field to order by"),
  orderDirection: z.nativeEnum(OrderDirection).optional().describe("Direction of ordering"),
});

