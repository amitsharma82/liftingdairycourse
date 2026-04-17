"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import * as profileService from "@/services/profiles";
import { z } from "zod";

export async function saveProfile(data: any) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  try {
    await profileService.upsertProfile(userId, data);
    return { success: true } as const;
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { 
        error: "Validation failed", 
        details: err.flatten().fieldErrors 
      } as const;
    }
    console.error("saveProfile error:", err);
    return { error: "Failed to save profile. Please try again." } as const;
  }
}

export async function removeProfile() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  try {
    await profileService.deleteProfile(userId);
    return { success: true } as const;
  } catch (err) {
    console.error("removeProfile error:", err);
    return { error: "Failed to delete profile. Please try again." } as const;
  }
}
