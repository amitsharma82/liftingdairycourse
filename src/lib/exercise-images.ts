// Exercise preview images sourced from the free-exercise-db (CC0 licence).
// https://github.com/yuhonas/free-exercise-db

const BASE = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises";

export const EXERCISE_IMAGES: Record<string, string> = {
  // ── Push: Chest ────────────────────────────────────────────────────────────
  "Bench Press":          `${BASE}/Barbell_Bench_Press_-_Medium_Grip/0.jpg`,
  "Incline Bench Press":  `${BASE}/Barbell_Incline_Bench_Press_-_Medium_Grip/0.jpg`,
  "Decline Bench Press":  `${BASE}/Decline_Barbell_Bench_Press/0.jpg`,
  "Dumbbell Fly":         `${BASE}/Dumbbell_Flyes/0.jpg`,
  "Cable Fly":            `${BASE}/Cable_Crossover/0.jpg`,
  "Dumbbell Bench Press": `${BASE}/Dumbbell_Bench_Press/0.jpg`,

  // ── Push: Shoulders ───────────────────────────────────────────────────────
  "Overhead Press":           `${BASE}/Barbell_Shoulder_Press/0.jpg`,
  "Dumbbell Shoulder Press":  `${BASE}/Seated_Dumbbell_Press/0.jpg`,
  "Arnold Press":             `${BASE}/Arnold_Dumbbell_Press/0.jpg`,
  "Lateral Raises":           `${BASE}/Side_Lateral_Raise/0.jpg`,
  "Front Raises":             `${BASE}/Alternating_Deltoid_Raise/0.jpg`,
  "Cable Lateral Raises":     `${BASE}/One-Arm_Side_Laterals/0.jpg`,

  // ── Push: Triceps ─────────────────────────────────────────────────────────
  "Tricep Pushdown":           `${BASE}/Triceps_Pushdown/0.jpg`,
  "Skull Crushers":            `${BASE}/Lying_Triceps_Press/0.jpg`,
  "Close Grip Bench Press":    `${BASE}/Close-Grip_Barbell_Bench_Press/0.jpg`,
  "Overhead Tricep Extension": `${BASE}/Cable_Rope_Overhead_Triceps_Extension/0.jpg`,
  "Tricep Dips":               `${BASE}/Dips_-_Triceps_Version/0.jpg`,

  // ── Pull: Back ────────────────────────────────────────────────────────────
  "Deadlift":               `${BASE}/Barbell_Deadlift/0.jpg`,
  "Barbell Row":            `${BASE}/Bent_Over_Barbell_Row/0.jpg`,
  "Pull-Ups":               `${BASE}/Pullups/0.jpg`,
  "Lat Pulldown":           `${BASE}/Wide-Grip_Lat_Pulldown/0.jpg`,
  "Seated Cable Row":       `${BASE}/Seated_Cable_Rows/0.jpg`,
  "Single Arm Dumbbell Row":`${BASE}/One-Arm_Dumbbell_Row/0.jpg`,
  "T-Bar Row":              `${BASE}/T-Bar_Row_with_Handle/0.jpg`,
  "Face Pulls":             `${BASE}/Face_Pull/0.jpg`,
  "Chest Supported Row":    `${BASE}/Dumbbell_Incline_Row/0.jpg`,

  // ── Pull: Biceps ──────────────────────────────────────────────────────────
  "Barbell Curl":          `${BASE}/Barbell_Curl/0.jpg`,
  "Dumbbell Curl":         `${BASE}/Dumbbell_Alternate_Bicep_Curl/0.jpg`,
  "Hammer Curl":           `${BASE}/Alternate_Hammer_Curl/0.jpg`,
  "Preacher Curl":         `${BASE}/Preacher_Curl/0.jpg`,
  "Incline Dumbbell Curl": `${BASE}/Alternate_Incline_Dumbbell_Curl/0.jpg`,
  "Cable Curl":            `${BASE}/Standing_Biceps_Cable_Curl/0.jpg`,

  // ── Legs: Quads / Hamstrings ──────────────────────────────────────────────
  "Barbell Squat":        `${BASE}/Barbell_Squat/0.jpg`,
  "Romanian Deadlift":    `${BASE}/Romanian_Deadlift/0.jpg`,
  "Leg Press":            `${BASE}/Leg_Press/0.jpg`,
  "Bulgarian Split Squat":`${BASE}/Split_Squat_with_Dumbbells/0.jpg`,
  "Hack Squat":           `${BASE}/Barbell_Hack_Squat/0.jpg`,
  "Leg Curl":             `${BASE}/Lying_Leg_Curls/0.jpg`,
  "Leg Extension":        `${BASE}/Leg_Extensions/0.jpg`,
  "Walking Lunges":       `${BASE}/Barbell_Walking_Lunge/0.jpg`,
  "Calf Raises":          `${BASE}/Barbell_Seated_Calf_Raise/0.jpg`,
  "Goblet Squat":         `${BASE}/Goblet_Squat/0.jpg`,

  // ── Legs: Glutes ──────────────────────────────────────────────────────────
  "Hip Thrust":     `${BASE}/Barbell_Hip_Thrust/0.jpg`,
  "Sumo Deadlift":  `${BASE}/Sumo_Deadlift/0.jpg`,
  "Cable Kickback": `${BASE}/One-Legged_Cable_Kickback/0.jpg`,
  "Glute Bridge":   `${BASE}/Barbell_Glute_Bridge/0.jpg`,
};
