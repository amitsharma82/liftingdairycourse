"use server";

import { auth }       from "@clerk/nextjs/server";
import { getProfile } from "@/data/profile";

export async function checkProfileExists(): Promise<boolean> {
  const { userId } = await auth();
  if (!userId) return false;
  const profile = await getProfile(userId);
  return profile !== null;
}
