
import { z } from "zod";

export const createPlayerSchema = z.object({
  playerName: z.string().min(3, { message: "Il nome deve contenere almeno 3 caratteri" }).max(30),
  role: z.string().min(1, { message: "Seleziona un ruolo" }),
  teamOption: z.enum(["join", "create"]),
  teamName: z.string().optional(),
  teamId: z.string().optional(),
  formation: z.string().optional(),
});

export type CreatePlayerValues = z.infer<typeof createPlayerSchema>;

export const roleOptions = [
  { value: "attaccante", label: "Attaccante" },
  { value: "centrocampista", label: "Centrocampista" },
  { value: "difensore", label: "Difensore" },
  { value: "portiere", label: "Portiere" },
];

export const formationOptions = [
  { value: "4-3-3", label: "4-3-3" },
  { value: "4-4-2", label: "4-4-2" },
  { value: "3-5-2", label: "3-5-2" },
  { value: "5-3-2", label: "5-3-2" },
];
