import { db }          from '@/db';
import { userProfiles } from '@/db/schema';
import { eq }           from 'drizzle-orm';

export type UserProfile = typeof userProfiles.$inferSelect;

/**
 * Fetches a user profile by Clerk userId.
 */
export async function getProfile(userId: string): Promise<UserProfile | null> {
  const [row] = await db
    .select()
    .from(userProfiles)
    .where(eq(userProfiles.userId, userId));
  return row ?? null;
}
