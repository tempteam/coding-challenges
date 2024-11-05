import { z } from 'zod';
import { planetSchema } from './planet.model';

export const peopleSchema = z.object({
  name: z.string(),
  birth_year: z.string(),
  homeworld: planetSchema,
});

export type PeopleDto = z.infer<typeof peopleSchema>;
