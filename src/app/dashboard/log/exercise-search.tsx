"use client";

import { useMemo, useState } from "react";
import { Input }             from "@/components/ui/input";
import { Button }            from "@/components/ui/button";
import { Badge }             from "@/components/ui/badge";
import type { getAllExercises } from "@/data/exercises";

type Exercise = Awaited<ReturnType<typeof getAllExercises>>[number];

const MUSCLE_LABEL: Record<string, string> = {
  chest: "CHEST", back: "BACK", shoulders: "SHOULDERS",
  biceps: "BICEPS", triceps: "TRICEPS", legs: "LEGS",
  glutes: "GLUTES", core: "CORE", full_body: "FULL BODY", other: "OTHER",
};

const MUSCLE_STYLE: Record<string, string> = {
  chest:     "border-cyan-400/50 text-cyan-400",
  back:      "border-primary/50 text-primary",
  shoulders: "border-orange-400/50 text-orange-400",
  biceps:    "border-orange-400/50 text-orange-400",
  triceps:   "border-orange-400/50 text-orange-400",
  legs:      "border-primary/50 text-primary",
  glutes:    "border-primary/50 text-primary",
  core:      "border-cyan-400/50 text-cyan-400",
  full_body: "border-primary/50 text-primary",
  other:     "border-muted-foreground/40 text-muted-foreground",
};

export default function ExerciseSearch({
  exercises,
  selectedIds,
  onSelect,
}: {
  exercises:   Exercise[];
  selectedIds: Set<string>;
  onSelect:    (exercise: Exercise) => void;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return exercises;
    return exercises.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.muscleGroup.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q),
    );
  }, [exercises, query]);

  return (
    <div className="space-y-2">
      <Input
        placeholder="Search exercises…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="font-mono"
        aria-label="Search exercises"
      />

      <div className="max-h-64 overflow-y-auto space-y-0.5 border border-border rounded-sm">
        {filtered.length === 0 ? (
          <p className="px-4 py-3 text-sm text-muted-foreground tracking-wide">
            No exercises found.
          </p>
        ) : (
          filtered.map((ex) => {
            const alreadyAdded = selectedIds.has(ex.id);
            return (
              <Button
                key={ex.id}
                type="button"
                variant="ghost"
                disabled={alreadyAdded}
                onClick={() => onSelect(ex)}
                className="w-full justify-between h-auto px-4 py-2.5 rounded-none text-left"
              >
                <span className="font-display tracking-[0.1em] text-sm">
                  {ex.name.toUpperCase()}
                </span>
                <Badge
                  variant="outline"
                  className={`text-[10px] tracking-[0.15em] uppercase shrink-0 ${
                    alreadyAdded
                      ? "border-muted-foreground/20 text-muted-foreground/40"
                      : (MUSCLE_STYLE[ex.muscleGroup] ?? MUSCLE_STYLE.other)
                  }`}
                >
                  {alreadyAdded ? "ADDED" : (MUSCLE_LABEL[ex.muscleGroup] ?? "OTHER")}
                </Badge>
              </Button>
            );
          })
        )}
      </div>
    </div>
  );
}
