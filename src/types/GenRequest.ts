import { z } from "zod";

// generate_image
export const GenerateImageParamsSchema = z.object({
  subthreadId: z.string().describe("Subthread ID used to generate the image"),
});

// generate_model
export const GenerateModelParamsSchema = z.object({
  imageRequestId: z.string().optional().describe("Optional ID of a previously generated image request"),
  imageUrl: z.string().describe("Image URL used to generate the model"),
  subthreadId: z.string().describe("Subthread ID where the model will be linked"),
});

// genrequest_get_all
export const GenRequestGetAllParamsSchema = z.object({
  subthreadId: z.string().describe("Subthread ID to retrieve all associated GenRequests"),
});
