import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod/v4";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";

export const createQuestionsRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    "/rooms/:roomId/questions",
    {
      schema: {
        params: z.object({
          roomId: z.string(),
        }),
        body: z.object({
          question: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { roomId } = request.params;
      const { question } = request.body;

      const newQuestion = await db
        .insert(schema.questions)
        .values({ roomId, question })
        .returning();

      const newQuestionId = newQuestion[0];

      if (!newQuestionId) {
        throw new Error("Failed to create question");
      }

      return reply.status(201).send({
        questionsId: newQuestionId.id,
      });
    }
  );
};
