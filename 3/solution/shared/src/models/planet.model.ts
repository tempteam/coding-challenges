import { z } from 'zod';

export const planetSchema = z.object({
  name: z.string(),
  terrain: z.string(),
});

export type PlanetDto = z.infer<typeof planetSchema>;
