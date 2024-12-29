import jwt from 'jsonwebtoken';
import config from '@/config/config.ts';
import type { TokenPayload } from '@/interface/jwt.interface.ts';

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
}
