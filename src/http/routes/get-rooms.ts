import { count, eq } from "drizzle-orm";
import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod/v4";
import { db } from "../../db/connection.ts";
import { schema } from "../../db/schema/index.ts";

const getRoomParamsSchema = z.object({
  roomId: z.string(),
});

export const getRoomsRoute: FastifyPluginCallbackZod = (app) => {
  app.get("/rooms", async () => {
    const rooms = await db
      .select({
        id: schema.rooms.id,
        name: schema.rooms.name,
        description: schema.rooms.description,
        createdAt: schema.rooms.createdAt,
        questionsCount: count(schema.questions.id),
      })
      .from(schema.rooms)
      .leftJoin(schema.questions, eq(schema.questions.roomId, schema.rooms.id))
      .groupBy(schema.rooms.id, schema.rooms.name)
      .orderBy(schema.rooms.createdAt);

    return rooms;
  });

  app.get(
    "/rooms/:roomId",
    {
      schema: {
        params: getRoomParamsSchema,
      },
    },
    async (request) => {
      const { roomId } = request.params;

      const room = await db
        .select({
          id: schema.rooms.id,
          name: schema.rooms.name,
          description: schema.rooms.description,
        })
        .from(schema.rooms)
        .where(eq(schema.rooms.id, roomId));

      return room;
    }
  );
};
