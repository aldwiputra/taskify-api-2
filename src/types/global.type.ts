import { User } from '@prisma/client';

export type AlteredUser = Pick<User, 'id' | 'username'>;
