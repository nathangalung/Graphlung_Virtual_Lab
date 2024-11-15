import { Context } from 'hono';
import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePasswords } from '../utils/password';
import { generateToken } from '../utils/token';
import { z } from 'zod';

const prisma = new PrismaClient();

const UserSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(6),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const register = async (c: Context) => {
  try {
    console.log('Register endpoint hit');
    const body = await c.req.json();
    console.log('Request body:', body);
    const { email, username, password } = UserSchema.parse(body);

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] }
    });

    if (existingUser) {
      console.log('Email or username already exists');
      return c.json({ error: 'Email or username already exists' }, 400);
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        gameRecords: {
          create: {} // Initialize empty game records
        }
      }
    });

    console.log('User registered successfully:', user);
    return c.json({ message: 'Sign up successful. Please sign in to continue.' });
  } catch (error) {
    console.error('Error in register endpoint:', error);
    return c.json({ error: 'Invalid input' }, 400);
  }
};

export const login = async (c: Context) => {
  try {
    console.log('Login endpoint hit');
    const body = await c.req.json();
    console.log('Request body:', body);
    const { email, password } = LoginSchema.parse(body);

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      console.log('Invalid credentials: User not found');
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    const isValidPassword = await comparePasswords(password, user.password);

    if (!isValidPassword) {
      console.log('Invalid credentials: Incorrect password');
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    const token = generateToken(user.id);

    console.log('User logged in successfully:', user);
    return c.json({ user: { id: user.id, email: user.email, username: user.username }, token });
  } catch (error) {
    console.error('Error in login endpoint:', error);
    return c.json({ error: 'Invalid input' }, 400);
  }
};