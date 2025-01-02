import argon2 from 'argon2';

export async function hashPassword(password: string): Promise<string> {
  try {
    return argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      hashLength: 50,
    });
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
    if (!hashedPassword.startsWith('$')) {
      throw new Error('Invalid hash format');
    }
    return await argon2.verify(hashedPassword, password);
  } catch (error) {
    console.log('Error hashing the password', error);
    throw new Error('Error verifying the password');
  }
}
