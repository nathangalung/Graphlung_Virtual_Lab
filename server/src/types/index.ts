import { z } from 'zod';

export const UserSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const LoginSchema = z.object({
  identifierType: z.enum(['email', 'username']),
  identifier: z.string().min(3, 'Identifier must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const GameRecordSchema = z.object({
  levelComplete: z.enum(['easy', 'medium', 'hard']),
  score: z.number(),
  timeInSeconds: z.number(),
});