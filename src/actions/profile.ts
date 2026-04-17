"use server";

import { auth }         from "@clerk/nextjs/server";
import { redirect }     from "next/navigation";
import { upsertProfile, deleteProfile, type ProfileInput } from "@/data/profile";

export async function saveProfile(data: ProfileInput) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  try {
    await upsertProfile(userId, data);
    return { success: true } as const;
  } catch (err) {
    console.error("saveProfile error:", err);
    return { error: "Failed to save profile. Please try again." } as const;
  }
}

export async function removeProfile() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  try {
    await deleteProfile(userId);
    return { success: true } as const;
  } catch (err) {
    console.error("removeProfile error:", err);
    return { error: "Failed to delete profile. Please try again." } as const;
  }
}
