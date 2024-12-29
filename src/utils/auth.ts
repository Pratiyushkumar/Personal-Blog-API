import argon2 from 'argon2';

export async function hashPassword(password: string): Promise<string> {
  try {
    return argon2.hash(password);
  } catch (error) {
    console.log('Error hashing the password', error);
    throw new Error('Error hashing the password');
  }
}

export async function verifyPassword(
  hashedPassword: string,
  password: string
): Promise<boolean> {
  try {
    return await argon2.verify(hashedPassword, password);
  } catch (error) {
    console.log('Error hashing the password', error);
    throw new Error('Error verifying the password');
  }
}
