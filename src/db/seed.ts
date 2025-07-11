import { reset, seed } from "drizzle-seed";
import { db, sql } from "./connection.ts";
import { schema } from "./schema/index.ts";

await reset(db, schema);

// biome-ignore lint/suspicious/noConsole: debug seed progress
console.log("Iniciando seed com drizzle-seed...");

// Seed usando a sintaxe oficial do drizzle-seed
// await seed(db, schema).refine((funcs) => ({
//   rooms: {
//     count: 20,
//     columns: {
//       // Não precisamos especificar id pois tem defaultRandom()
//       // Não precisamos especificar createdAt/updatedAt pois tem defaultNow()
//       name: funcs.companyName(),
//       description: funcs.loremIpsum(),
//     },
//     questions: {
//       count: 5,
//       columns: {
//         question: funcs.loremIpsum(),
//         answer: funcs.loremIpsum(),
//       },
//     },
//   },
// }));

// biome-ignore lint/suspicious/noConsole: debug seed progress
console.log("Seed com drizzle-seed completado!");

// Verificar se os dados foram inseridos
const countResult = await sql`SELECT COUNT(*) FROM rooms`;
// biome-ignore lint/suspicious/noConsole: debug seed progress
console.log("Total de registros na tabela rooms:", countResult[0].count);

await sql.end();

// biome-ignore lint/suspicious/noConsole: seed completion log
console.log("Processo finalizado!");
