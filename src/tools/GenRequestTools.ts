import { FastMCP } from "fastmcp";
import { BuuFunServerClient } from 'buu-server-sdk';
import { GenerateImageParamsSchema, GenerateModelParamsSchema, GenRequestGetAllParamsSchema } from "../types/GenRequest";

export const registerGenRequestTools = (server: FastMCP, client: BuuFunServerClient) => {
  server.addTool({
    name: "generate_image",
    description:
      "[PRIVATE] - Generate image",
    parameters: GenerateImageParamsSchema,
    execute: async ({ subthreadId }) => {
      const response = await client.genRequest.generateImage({ subthreadId });

      return JSON.stringify(response)
    },
  });

  server.addTool({
    name: "generate_model",
    description:
      "[PRIVATE] - Generate model.",
    parameters: GenerateModelParamsSchema,
    execute: async ({ imageRequestId, subthreadId, imageUrl }) => {
      const response = await client.genRequest.generateModel({ subthreadId, imageRequestId, imageUrl });

      return JSON.stringify(response)
    },
  });

  server.addTool({
    name: "genrequest_get_all",
    description:
      "[PRIVATE] - Get all team's GenRequests by subthread ID",
    parameters: GenRequestGetAllParamsSchema,
    execute: async ({ subthreadId }) => {
      const response = await client.genRequest.getGenRequest({ subthreadId });

      return JSON.stringify(response)
    },
  });
}
