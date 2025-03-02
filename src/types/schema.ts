import { z } from 'zod';

// Schema untuk data pemain bola
export const TopPlayerSchema = z.object({
  rank: z.number(),
  name: z.string(),
  image: z.string().url(),
  assists: z.number(),
  country: z.string(),
  team: z.string(),
  height_cm: z.number(),
  birth_date: z.string(),
  position: z.string(),
  jersey_name: z.string(),
  joined_year: z.number(),
  end_year: z.number().nullable(),
  flag: z.string(),
});

// Type yang dihasilkan dari schema
export type TopPlayer = z.infer<typeof TopPlayerSchema>;

// Schema untuk array data pemain bola
export const TopPlayersSchema = z.array(TopPlayerSchema);

// Fungsi untuk memvalidasi data
export const validateTopPlayers = (data: unknown) => {
  return TopPlayersSchema.parse(data);
};