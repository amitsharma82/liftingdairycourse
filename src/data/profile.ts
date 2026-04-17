import { db }          from '@/db';
import { userProfiles } from '@/db/schema';
import { eq }           from 'drizzle-orm';

export type UserProfile = typeof userProfiles.$inferSelect;
export type ProfileInput = Omit<UserProfile, 'userId' | 'createdAt' | 'updatedAt'>;

export async function getProfile(userId: string): Promise<UserProfile | null> {
  const [row] = await db
    .select()
    .from(userProfiles)
    .where(eq(userProfiles.userId, userId));
  return row ?? null;
}

export async function upsertProfile(userId: string, data: ProfileInput): Promise<void> {
  await db
    .insert(userProfiles)
    .values({ userId, ...data, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: userProfiles.userId,
      set:    { ...data, updatedAt: new Date() },
    });
}

export async function deleteProfile(userId: string): Promise<void> {
  await db.delete(userProfiles).where(eq(userProfiles.userId, userId));
}
