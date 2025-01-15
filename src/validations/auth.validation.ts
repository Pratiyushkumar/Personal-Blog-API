import { z } from 'zod';

export const signupSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  password: z
    .string()
    .min(6)
    .max(255)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    ),
  fullname: z
    .string()
    .trim()
    .min(3)
    .max(255, 'Full name must be less than 255 characters'),
  username: z
    .string()
    .trim()
    .min(3)
    .max(50, 'Username must be less than 50 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers and underscores'
    ),
});

export const signinSchema = z.object({
  email: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  username: z.string().min(3).max(50).optional(),
  password: z.string().min(6).max(255),
});
