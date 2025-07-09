import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod/v4";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";

export const createRoomRoute: FastifyPluginCallbackZod = (app) => {
  app.post(
    "/rooms",
    {
      schema: {
        body: z.object({
          name: z.string(),
          description: z.string().optional(),
        }),
      },
    },
    async (request, reply) => {
      const { name, description } = request.body;

      const room = await db
        .insert(schema.rooms)
        .values({ name, description })
        .returning();

      const roomId = room[0];

      if (!roomId) {
        throw new Error("Failed to create room");
      }

      return reply.status(201).send({
        roomId: roomId.id,
      });
    }
  );
};
