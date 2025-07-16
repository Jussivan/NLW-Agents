import { reset, seed } from 'drizzle-seed';
import { db, sql } from './connection.ts';
import { schema } from './schema/index.ts';

const partialSchema = {
  rooms: schema.rooms,
  questions: schema.questions,
};

await reset(db, partialSchema);
await seed(db, partialSchema).refine((f) => {
  return {
    rooms: {
      count: 1,
      columns: {
        name: f.companyName(),
        description: f.loremIpsum(),
      },
    },
    questions: {
      count: 5,
    },
  }
}); 
await sql.end();

console.log('Database seeded successfully.');