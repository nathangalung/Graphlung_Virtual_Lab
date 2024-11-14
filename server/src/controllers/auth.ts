import { Context } from 'hono';
import { PrismaClient } from '@prisma/client';
import { UserSchema, LoginSchema } from '../types';
import { hashPassword, comparePasswords } from '../utils/password';
import { generateToken } from '../utils/token';

const prisma = new PrismaClient();

export const register = async (c: Context) => {
  try {
    const body = await c.req.json();
    const { email, username, password } = UserSchema.parse(body);

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] }
    });

    if (existingUser) {
      return c.json({ error: 'Email or username already exists' }, 400);
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        gameStats: {
          create: {} // Initialize empty game stats
        }
      }
    });

    const token = generateToken(user.id);

    return c.json({ user: { id: user.id, email: user.email, username: user.username }, token });
  } catch (error) {
    return c.json({ error: 'Invalid input' }, 400);
  }
};

export const login = async (c: Context) => {
  try {
    const body = await c.req.json();
    const { email, password } = LoginSchema.parse(body);

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    const isValidPassword = await comparePasswords(password, user.password);

    if (!isValidPassword) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    const token = generateToken(user.id);

    return c.json({ user: { id: user.id, email: user.email, username: user.username }, token });
  } catch (error) {
    return c.json({ error: 'Invalid input' }, 400);
  }
};