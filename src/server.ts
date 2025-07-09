import fastifyCors from "@fastify/cors";
import "dotenv/config";
import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";

import { env } from "./env.ts";
import { getRoomsRoute } from "./http/routes/get-roms.ts";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 600,
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get("/health", () => {
  return { status: "ok" };
});

app.register(getRoomsRoute);

app.listen({ port: env.PORT }).then(() => {
  // biome-ignore lint/suspicious/noConsole: server startup log
  console.log(`Server is running on port ${process.env.PORT}`);
});
