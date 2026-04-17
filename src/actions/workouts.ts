"use server";

import { auth } from "@clerk/nextjs/server";
import * as workoutService from "@/services/workouts";
import { z } from "zod";

// ─── logWorkout ───────────────────────────────────────────────────────────────

export async function logWorkout(
  input: any, // Use any for raw input to validate via Zod inside
): Promise<{ workoutId: string } | { error: string; details?: any }> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  try {
    const result = await workoutService.createWorkout({
      ...input,
      userId,
    });
    return result;
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { 
        error: "Validation failed", 
        details: err.flatten().fieldErrors 
      };
    }
    console.error("[logWorkout]", err);
    return { error: "Failed to save workout" };
  }
}

// ─── deleteWorkout ────────────────────────────────────────────────────────────

export async function deleteWorkout(workoutId: string): Promise<{ error?: string }> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  try {
    await workoutService.deleteWorkout(workoutId, userId);
    return {};
  } catch (err) {
    console.error("[deleteWorkout]", err);
    return { error: err instanceof Error ? err.message : "Failed to delete workout" };
  }
}
