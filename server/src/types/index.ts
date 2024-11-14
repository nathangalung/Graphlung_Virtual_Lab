import { z } from 'zod';

export const UserSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(20),
  password: z.string().min(6)
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export const GameStatSchema = z.object({
  totalPoints: z.number(),
  levelComplete: z.enum(['easy', 'medium', 'hard']),
  score: z.number(),
  timeInSeconds: z.number()
});

export type UserCreate = z.infer<typeof UserSchema>;
export type LoginData = z.infer<typeof LoginSchema>;
export type GameStatUpdate = z.infer<typeof GameStatSchema>;