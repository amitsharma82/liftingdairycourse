"use client";

import { useState, useTransition } from "react";
import { useRouter }               from "next/navigation";
import { Button }    from "@/components/ui/button";
import { Input }     from "@/components/ui/input";
import { Label }     from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { saveProfile, removeProfile } from "@/actions/profile";
import type { UserProfile } from "@/data/profile";

// ─── Cartoon animal avatars (Twemoji) ─────────────────────────────────────────

const ANIMALS = [
  { emoji: "🦁", name: "Lion"     },
  { emoji: "🐯", name: "Tiger"    },
  { emoji: "🐻", name: "Bear"     },
  { emoji: "🐼", name: "Panda"    },
  { emoji: "🦊", name: "Fox"      },
  { emoji: "🐺", name: "Wolf"     },
  { emoji: "🐸", name: "Frog"     },
  { emoji: "🐨", name: "Koala"    },
  { emoji: "🦝", name: "Raccoon"  },
  { emoji: "🐮", name: "Cow"      },
  { emoji: "🐷", name: "Pig"      },
  { emoji: "🦄", name: "Unicorn"  },
  { emoji: "🐲", name: "Dragon"   },
  { emoji: "🦅", name: "Eagle"    },
  { emoji: "🦉", name: "Owl"      },
  { emoji: "🐬", name: "Dolphin"  },
  { emoji: "🦈", name: "Shark"    },
  { emoji: "🦓", name: "Zebra"    },
  { emoji: "🐘", name: "Elephant" },
  { emoji: "🦒", name: "Giraffe"  },
  { emoji: "🐆", name: "Leopard"  },
  { emoji: "🦍", name: "Gorilla"  },
  { emoji: "🦋", name: "Butterfly"},
  { emoji: "🐧", name: "Penguin"  },
  { emoji: "🦜", name: "Parrot"   },
  { emoji: "🦩", name: "Flamingo" },
  { emoji: "🦔", name: "Hedgehog" },
  { emoji: "🐙", name: "Octopus"  },
  { emoji: "🦇", name: "Bat"      },
  { emoji: "🦏", name: "Rhino"    },
];

function emojiToTwemoji(emoji: string): string {
  const cp = [...emoji]
    .map(c => c.codePointAt(0)!)
    .filter(n => n !== 0xfe0f)           // strip variation selector-16
    .map(n => n.toString(16))
    .join("-");
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/${cp}.png`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProfileForm({
  profile,
  isSetup = false,
}: {
  profile: UserProfile | null;
  isSetup?: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [saved,  setSaved]  = useState(false);
  const [error,  setError]  = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [avatar,        setAvatar]        = useState(profile?.avatarEmoji ?? "");
  const [displayName,   setDisplayName]   = useState(profile?.displayName ?? "");
  const [gender,        setGender]        = useState(profile?.gender ?? "");
  const [dob,           setDob]           = useState(profile?.dateOfBirth ?? "");
  const [heightCm,      setHeightCm]      = useState(profile?.heightCm ?? "");
  const [weightKg,      setWeightKg]      = useState(profile?.weightKg ?? "");
  const [fitnessGoal,   setFitnessGoal]   = useState(profile?.fitnessGoal ?? "");
  const [activityLevel, setActivityLevel] = useState(profile?.activityLevel ?? "");

  function handleSave() {
    setError(null);
    setSaved(false);

    startTransition(async () => {
      const result = await saveProfile({
        displayName:   displayName.trim() || null,
        avatarEmoji:   avatar || null,
        gender:        (gender as UserProfile["gender"]) || null,
        dateOfBirth:   dob || null,
        heightCm:      heightCm ? String(heightCm) : null,
        weightKg:      weightKg ? String(weightKg) : null,
        fitnessGoal:   (fitnessGoal as UserProfile["fitnessGoal"]) || null,
        activityLevel: (activityLevel as UserProfile["activityLevel"]) || null,
      });

      if ("error" in result) {
        setError(result.error ?? "Failed to save profile.");
      } else {
        setSaved(true);
        setTimeout(() => router.push("/dashboard"), 900);
      }
    });
  }

  function handleDelete() {
    setError(null);
    startTransition(async () => {
      const result = await removeProfile();
      if ("error" in result) {
        setError(result.error ?? "Failed to delete profile.");
        setConfirmDelete(false);
      } else {
        router.push("/dashboard");
      }
    });
  }

  const ACCENT = "#a3e635";
  const DANGER = "#f87171";

  return (
    <div className="space-y-10">

      {/* ── Avatar picker ──────────────────────────────────────────────────── */}
      <div className="space-y-4">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1">
            Your Character
          </p>
          <p className="text-xs text-muted-foreground">
            Pick a cartoon animal that represents you
          </p>
        </div>

        {/* Preview */}
        {avatar && (
          <div className="flex items-center gap-4">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center border-2"
              style={{ borderColor: ACCENT, background: `${ACCENT}10` }}
            >
              <img
                src={emojiToTwemoji(avatar)}
                alt={avatar}
                className="w-12 h-12"
              />
            </div>
            <div>
              <p className="font-display tracking-widest text-sm" style={{ color: ACCENT }}>
                {ANIMALS.find(a => a.emoji === avatar)?.name?.toUpperCase() ?? "CUSTOM"}
              </p>
              <button
                type="button"
                onClick={() => setAvatar("")}
                className="text-[10px] text-muted-foreground tracking-wider underline underline-offset-2 mt-0.5"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Animal grid */}
        <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
          {ANIMALS.map(({ emoji, name }) => (
            <button
              key={emoji}
              type="button"
              title={name}
              onClick={() => setAvatar(emoji)}
              className="aspect-square rounded-sm border p-1.5 transition-all hover:scale-110 focus-visible:outline-none"
              style={{
                borderColor: avatar === emoji ? ACCENT : "rgba(255,255,255,0.08)",
                background:  avatar === emoji ? `${ACCENT}15` : "transparent",
                boxShadow:   avatar === emoji ? `0 0 10px ${ACCENT}40` : "none",
              }}
            >
              <img
                src={emojiToTwemoji(emoji)}
                alt={name}
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* ── Personal info ──────────────────────────────────────────────────── */}
      <div className="space-y-5">
        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
          Personal Info
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs tracking-wider text-muted-foreground">
              Display Name
            </Label>
            <Input
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              placeholder="e.g. Amit"
              className="font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs tracking-wider text-muted-foreground">
              Gender
            </Label>
            <Select value={gender} onValueChange={v => setGender(v ?? "")}>
              <SelectTrigger className="font-mono">
                <SelectValue placeholder="Select…" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs tracking-wider text-muted-foreground">
              Date of Birth
            </Label>
            <Input
              type="date"
              value={dob}
              onChange={e => setDob(e.target.value)}
              className="font-mono"
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* ── Body stats ─────────────────────────────────────────────────────── */}
      <div className="space-y-5">
        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
          Body Stats
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs tracking-wider text-muted-foreground">
              Height (cm)
            </Label>
            <Input
              type="number"
              value={heightCm}
              onChange={e => setHeightCm(e.target.value)}
              placeholder="e.g. 178"
              className="font-mono"
              min={100}
              max={250}
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs tracking-wider text-muted-foreground">
              Weight (kg)
            </Label>
            <Input
              type="number"
              value={weightKg}
              onChange={e => setWeightKg(e.target.value)}
              placeholder="e.g. 80"
              className="font-mono"
              min={30}
              max={300}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* ── Goals ──────────────────────────────────────────────────────────── */}
      <div className="space-y-5">
        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
          Your Goals
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-xs tracking-wider text-muted-foreground">
              Fitness Goal
            </Label>
            <Select value={fitnessGoal} onValueChange={v => setFitnessGoal(v ?? "")}>
              <SelectTrigger className="font-mono">
                <SelectValue placeholder="Select…" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lose_weight">Lose Weight</SelectItem>
                <SelectItem value="build_muscle">Build Muscle</SelectItem>
                <SelectItem value="maintain">Maintain</SelectItem>
                <SelectItem value="improve_fitness">Improve Fitness</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs tracking-wider text-muted-foreground">
              Activity Level
            </Label>
            <Select value={activityLevel} onValueChange={v => setActivityLevel(v ?? "")}>
              <SelectTrigger className="font-mono">
                <SelectValue placeholder="Select…" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary (desk job)</SelectItem>
                <SelectItem value="light">Light (1–2 days/week)</SelectItem>
                <SelectItem value="moderate">Moderate (3–5 days/week)</SelectItem>
                <SelectItem value="active">Active (6–7 days/week)</SelectItem>
                <SelectItem value="very_active">Very Active (athlete)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* ── Error / success ────────────────────────────────────────────────── */}
      {error && (
        <p className="text-destructive text-sm border border-destructive/30 rounded-sm px-4 py-3">
          {error}
        </p>
      )}
      {saved && (
        <p
          className="text-sm border rounded-sm px-4 py-3 tracking-wide"
          style={{ color: ACCENT, borderColor: `${ACCENT}40`, background: `${ACCENT}08` }}
        >
          Profile saved.
        </p>
      )}

      {/* ── Actions ────────────────────────────────────────────────────────── */}
      <div className="flex gap-3">
        <Button
          type="button"
          onClick={handleSave}
          disabled={isPending}
          className="flex-1 font-display tracking-[0.2em] uppercase btn-shine"
          style={{ fontSize: "0.95rem" }}
        >
          {isPending ? "SAVING…" : isSetup ? "SAVE & GO TO DASHBOARD" : "SAVE PROFILE"}
        </Button>
        {isSetup && (
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard")}
            disabled={isPending}
            className="tracking-[0.15em] text-xs uppercase"
          >
            Skip for now
          </Button>
        )}
      </div>

      {/* ── Danger zone ────────────────────────────────────────────────────── */}
      {!isSetup && (
        <>
          <Separator />
          <div className="space-y-4 pb-12">
            <p
              className="text-[10px] tracking-[0.3em] uppercase"
              style={{ color: DANGER }}
            >
              Danger Zone
            </p>

            {!confirmDelete ? (
              <div
                className="flex items-center justify-between rounded-sm border px-5 py-4"
                style={{ borderColor: `${DANGER}30`, background: `${DANGER}05` }}
              >
                <div>
                  <p className="text-sm font-medium text-zinc-200 tracking-wide">
                    Delete profile
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Removes your personal data. Your workouts are kept.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setConfirmDelete(true)}
                  disabled={isPending}
                  className="text-xs tracking-[0.15em] uppercase shrink-0"
                  style={{ borderColor: `${DANGER}50`, color: DANGER }}
                >
                  Delete
                </Button>
              </div>
            ) : (
              <div
                className="rounded-sm border px-5 py-5 space-y-4"
                style={{ borderColor: `${DANGER}60`, background: `${DANGER}08` }}
              >
                <p className="text-sm tracking-wide" style={{ color: DANGER }}>
                  Are you sure? This cannot be undone.
                </p>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={handleDelete}
                    disabled={isPending}
                    className="text-xs tracking-[0.15em] uppercase"
                    style={{ background: DANGER, color: "#111", border: "none" }}
                  >
                    {isPending ? "DELETING…" : "YES, DELETE MY PROFILE"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setConfirmDelete(false)}
                    disabled={isPending}
                    className="text-xs tracking-[0.15em] uppercase"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
