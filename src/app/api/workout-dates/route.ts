import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { workouts } from "@/db/schema";
import { eq, and, gte, lt } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ dates: [] }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const year  = parseInt(searchParams.get("year")  ?? String(new Date().getFullYear()), 10);
  const month = parseInt(searchParams.get("month") ?? String(new Date().getMonth() + 1), 10);

  if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
    return NextResponse.json({ dates: [] }, { status: 400 });
  }

  const monthStart = new Date(Date.UTC(year, month - 1, 1));
  const monthEnd   = new Date(Date.UTC(year, month,     1)); // first of next month

  try {
    const rows = await db
      .select({ startedAt: workouts.startedAt })
      .from(workouts)
      .where(
        and(
          eq(workouts.userId, userId),
          gte(workouts.startedAt, monthStart),
          lt(workouts.startedAt, monthEnd)
        )
      );

    // Deduplicate to unique YYYY-MM-DD strings (UTC)
    const dateSet = new Set<string>();
    for (const { startedAt } of rows) {
      const d = new Date(startedAt);
      const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(d.getUTCDate()).padStart(2, "0")}`;
      dateSet.add(key);
    }

    return NextResponse.json({ dates: [...dateSet] });
  } catch (err) {
    console.error("[workout-dates] DB error:", err);
    return NextResponse.json({ dates: [] }, { status: 500 });
  }
}
