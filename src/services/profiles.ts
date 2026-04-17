import { db } from "@/db";
import { userProfiles, genderEnum, fitnessGoalEnum, activityLevelEnum } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

// ─── Schemas ──────────────────────────────────────────────────────────────────

export const ProfileInputSchema = z.object({
  displayName:   z.string().nullable(),
  avatarEmoji:   z.string().nullable(),
  gender:        z.enum(genderEnum.enumValues).nullable(),
  dateOfBirth:   z.string().nullable(), // date string from form
  heightCm:      z.string().nullable(),
  weightKg:      z.string().nullable(),
  fitnessGoal:   z.enum(fitnessGoalEnum.enumValues).nullable(),
  activityLevel: z.enum(activityLevelEnum.enumValues).nullable(),
});

// ─── Types ────────────────────────────────────────────────────────────────────

export type ProfileInput = z.infer<typeof ProfileInputSchema>;

// ─── Service Methods ──────────────────────────────────────────────────────────

/**
 * Creates or updates a user profile.
 */
export async function upsertProfile(userId: string, rawData: ProfileInput) {
  const data = ProfileInputSchema.parse(rawData);

  return await db
    .insert(userProfiles)
    .values({ 
      userId, 
      ...data, 
      updatedAt: new Date() 
    })
    .onConflictDoUpdate({
      target: userProfiles.userId,
      set: { 
        ...data, 
        updatedAt: new Date() 
      },
    })
    .returning();
}

/**
 * Deletes a user profile.
 */
export async function deleteProfile(userId: string) {
  return await db
    .delete(userProfiles)
    .where(eq(userProfiles.userId, userId))
    .returning();
}
