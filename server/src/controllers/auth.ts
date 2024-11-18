import { Context } from 'hono';
import prisma from './prisma';
import { hashPassword, comparePasswords } from '../utils/password';
import { generateToken } from '../utils/token';
import { UserSchema, LoginSchema } from '../types';

export const register = async (c: Context) => {
  try {
    const body = await c.req.json();
    const { email, username, password } = UserSchema.parse(body);

    // Check for existing user with Promise.all for parallel execution
    const [existingEmail, existingUsername] = await Promise.all([
      prisma.user.findUnique({ where: { email } }),
      prisma.user.findUnique({ where: { username } })
    ]);

    if (existingEmail || existingUsername) {
      return c.json({
        error: existingEmail ? 'Email already exists' : 'Username already exists'
      }, 400);
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

    return c.json({ message: 'Sign up successful. Please sign in to continue.' });
  } catch (error) {
    console.error('Error in register endpoint:', error);
    return c.json({ error: 'Registration failed' }, 400);
  }
};

export const login = async (c: Context) => {
  try {
    console.log('Login endpoint hit');
    const body = await c.req.json();
    console.log('Request body:', body);
    const { identifier, password } = LoginSchema.parse(body);

    // Find user by email or username
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { username: identifier }
        ]
      }
    });

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