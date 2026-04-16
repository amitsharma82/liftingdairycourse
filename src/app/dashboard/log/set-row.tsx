"use client";

import { Input }  from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

export type SetData = {
  weightKg: string;
  reps:     string;
  rpe:      string;
  showRpe:  boolean;
};

export function emptySet(prevWeight?: string): SetData {
  return { weightKg: prevWeight ?? "", reps: "", rpe: "", showRpe: false };
}

export default function SetRow({
  set,
  index,
  onChange,
  onRemove,
}: {
  set:      SetData;
  index:    number;
  onChange: (field: keyof SetData, value: string | boolean) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      {/* Set number */}
      <span className="font-display text-primary w-6 text-right text-sm shrink-0 tabular-nums">
        {index + 1}
      </span>

      {/* Weight */}
      <Input
        type="number"
        inputMode="decimal"
        placeholder="kg"
        size={4}
        value={set.weightKg}
        onChange={(e) => onChange("weightKg", e.target.value)}
        className="w-20 text-right tabular-nums font-display text-primary"
        aria-label={`Set ${index + 1} weight`}
      />

      <span className="text-muted-foreground/60 text-xs">×</span>

      {/* Reps */}
      <Input
        type="number"
        inputMode="numeric"
        placeholder="reps"
        size={4}
        value={set.reps}
        onChange={(e) => onChange("reps", e.target.value)}
        className="w-20 text-right tabular-nums font-display"
        aria-label={`Set ${index + 1} reps`}
      />

      {/* RPE toggle + field */}
      {set.showRpe ? (
        <Input
          type="number"
          inputMode="decimal"
          placeholder="RPE"
          size={3}
          min={1}
          max={10}
          step={0.5}
          value={set.rpe}
          onChange={(e) => onChange("rpe", e.target.value)}
          className="w-20 text-right tabular-nums text-orange-400"
          aria-label={`Set ${index + 1} RPE`}
        />
      ) : (
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-8 w-8 text-orange-400/80 border-orange-400/40 bg-orange-400/8 hover:text-orange-400 hover:border-orange-400 hover:bg-orange-400/20"
          onClick={() => onChange("showRpe", true)}
          aria-label="Add RPE"
        >
          <Plus size={12} />
        </Button>
      )}

      {/* Remove set */}
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="h-8 w-8 ml-auto text-destructive/70 border-destructive/40 bg-destructive/8 hover:text-destructive hover:border-destructive hover:bg-destructive/20"
        onClick={onRemove}
        aria-label={`Remove set ${index + 1}`}
      >
        <X size={12} />
      </Button>
    </div>
  );
}
