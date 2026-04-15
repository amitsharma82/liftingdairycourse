"use client";

import { useRouter }                          from "next/navigation";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Button }                             from "@/components/ui/button";
import { Calendar }                           from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getTodayStr(): string {
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`;
}

function offsetDate(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + days);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
}

function parseDateStr(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatDisplay(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return {
    weekday: dt.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase(),
    full:    dt.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DateNav({
  date,
  workoutDates,
}: {
  date: string;
  workoutDates: string[];
}) {
  const router  = useRouter();
  const today   = getTodayStr();
  const isToday = date === today;
  const { weekday, full } = formatDisplay(date);

  function navigate(d: string) {
    router.push(`/dashboard?date=${d}`);
  }

  function handleCalendarSelect(selected: Date | undefined) {
    if (!selected) return;
    const y = selected.getFullYear();
    const m = String(selected.getMonth() + 1).padStart(2, "0");
    const d = String(selected.getDate()).padStart(2, "0");
    navigate(`${y}-${m}-${d}`);
  }

  const selectedDate   = parseDateStr(date);
  const todayDate      = parseDateStr(today);
  const workoutDateObjs = workoutDates.map(parseDateStr);

  return (
    <div className="flex flex-wrap items-center gap-2">

      {/* ── Previous day ──────────────────────────────────────────────── */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => navigate(offsetDate(date, -1))}
        aria-label="Previous day"
      >
        <ChevronLeft size={16} />
      </Button>

      {/* ── Date trigger + calendar ───────────────────────────────────── */}
      <Popover>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              aria-label="Open calendar"
              className="h-auto px-4 py-2 gap-3 items-center text-left"
            />
          }
        >
          {/* Today indicator dot */}
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{
              backgroundColor: isToday ? "var(--primary)" : "var(--muted-foreground)",
              boxShadow:       isToday ? "0 0 8px var(--primary)" : "none",
            }}
          />

          {/* Date labels */}
          <span className="flex flex-col gap-0.5">
            <span className="font-display tracking-[0.18em] text-lg leading-none text-primary">
              {weekday}
            </span>
            <span className="text-[11px] text-muted-foreground tracking-widest leading-none font-mono">
              {full}
            </span>
          </span>

          <CalendarIcon size={14} className="ml-1 text-muted-foreground shrink-0" />
        </PopoverTrigger>

        <PopoverContent align="start" className="p-0 w-auto">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleCalendarSelect}
            disabled={(d) => d > todayDate}
            defaultMonth={selectedDate}
            modifiers={{ workout: workoutDateObjs }}
            modifiersClassNames={{ workout: "day-has-workout" }}
            classNames={{
              caption_label: "font-display tracking-[0.16em] text-sm text-primary",
            }}
          />
        </PopoverContent>
      </Popover>

      {/* ── Next day ──────────────────────────────────────────────────── */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => navigate(offsetDate(date, 1))}
        disabled={isToday}
        aria-label="Next day"
      >
        <ChevronRight size={16} />
      </Button>

      {/* ── Today shortcut ────────────────────────────────────────────── */}
      {!isToday && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(today)}
          className="tracking-[0.2em] text-xs uppercase text-primary border-primary/30 hover:bg-primary/10 hover:text-primary"
        >
          Today
        </Button>
      )}
    </div>
  );
}
