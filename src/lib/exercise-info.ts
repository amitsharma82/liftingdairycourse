// Step-by-step instructions for every exercise in the seed library.
// Steps are intentionally short (beginner-friendly) with one optional tip.

type ExerciseInfo = {
  steps: string[];
  tip?: string;
};

export const EXERCISE_INFO: Record<string, ExerciseInfo> = {

  // ── Push: Chest ────────────────────────────────────────────────────────────

  "Bench Press": {
    steps: [
      "Lie flat on the bench, feet flat on the floor.",
      "Grip the bar slightly wider than shoulder-width, wrists straight.",
      "Lower the bar in a controlled arc to your mid-chest.",
      "Press back up to full arm extension — don't lock out aggressively.",
    ],
    tip: "Keep your shoulder blades pinched together and stay planted throughout.",
  },
  "Incline Bench Press": {
    steps: [
      "Set the bench to 30–45° incline.",
      "Grip the bar slightly wider than shoulder-width.",
      "Lower the bar to your upper chest (around collarbone level).",
      "Press straight up, squeeze the upper chest at the top.",
    ],
    tip: "The steeper the angle, the more shoulder involvement — 30° is ideal for upper chest.",
  },
  "Decline Bench Press": {
    steps: [
      "Set the bench to -15 to -30° and secure your feet.",
      "Grip the bar shoulder-width or slightly wider.",
      "Lower to your lower chest (below the nipple line).",
      "Press up until arms are nearly extended.",
    ],
  },
  "Dumbbell Fly": {
    steps: [
      "Lie flat, hold dumbbells above your chest with a slight bend in the elbows.",
      "Lower your arms out in a wide arc — feel the chest stretch.",
      "Stop when dumbbells reach chest level, then squeeze back to the top.",
    ],
    tip: "Think of hugging a barrel — keep the elbow bend constant throughout.",
  },
  "Cable Fly": {
    steps: [
      "Set both cable pulleys to shoulder height, stand between them.",
      "Grab each handle, step forward one foot, slight lean forward.",
      "Sweep your hands together in front of you in a wide arc.",
      "Slowly return to the start, feeling the chest stretch.",
    ],
  },
  "Dumbbell Bench Press": {
    steps: [
      "Sit on the bench with dumbbells on your thighs, then lie back.",
      "Hold the dumbbells at chest level, elbows at 45–75° from your body.",
      "Press up until arms nearly extend, squeezing the chest.",
      "Lower slowly, feeling the stretch at the bottom.",
    ],
  },

  // ── Push: Shoulders ───────────────────────────────────────────────────────

  "Overhead Press": {
    steps: [
      "Stand with the bar at upper-chest height, grip just outside shoulder-width.",
      "Brace your core and press the bar straight overhead.",
      "Lock out at the top, shrugging the traps slightly.",
      "Lower back to the starting position under control.",
    ],
    tip: "Keep your glutes squeezed — it protects your lower back.",
  },
  "Dumbbell Shoulder Press": {
    steps: [
      "Sit upright on a bench, dumbbells at ear level, elbows at 90°.",
      "Press both dumbbells overhead until arms are extended.",
      "Lower slowly back to ear level.",
    ],
  },
  "Arnold Press": {
    steps: [
      "Sit upright, hold dumbbells at chin level with palms facing YOU.",
      "As you press up, rotate your palms outward so they face away at the top.",
      "Fully extend, then reverse the rotation as you lower back to chin height.",
    ],
    tip: "Named after Arnold Schwarzenegger — the rotation hits all three delt heads.",
  },
  "Lateral Raises": {
    steps: [
      "Stand with dumbbells at your sides, slight bend in the elbows.",
      "Raise your arms out to the side until they reach shoulder height.",
      "Pause briefly at the top, then lower slowly.",
    ],
    tip: "Lead with your elbows, not your hands — keeps the tension on the side delts.",
  },
  "Front Raises": {
    steps: [
      "Stand with dumbbells in front of your thighs, palms facing back.",
      "Raise one or both arms forward to shoulder height, keeping arms straight.",
      "Lower slowly back to the start.",
    ],
  },
  "Cable Lateral Raises": {
    steps: [
      "Stand beside the cable machine, low pulley attachment on the far side.",
      "Grip the handle across your body, stand tall.",
      "Raise your arm out to the side to shoulder height.",
      "Lower under control — don't let the weight stack crash.",
    ],
  },

  // ── Push: Triceps ─────────────────────────────────────────────────────────

  "Tricep Pushdown": {
    steps: [
      "Stand at the cable machine with a bar or rope at chest height.",
      "Grip the attachment, elbows pinned tightly to your sides.",
      "Push the bar down until arms are fully extended.",
      "Slowly let the weight rise back up, stopping at chest height.",
    ],
    tip: "Don't let your elbows flare out — keeping them tucked isolates the triceps.",
  },
  "Skull Crushers": {
    steps: [
      "Lie flat on a bench, hold an EZ-bar above your forehead at arm's length.",
      "Bend only at the elbows, lowering the bar toward your forehead.",
      "Stop just above your forehead, then extend back to the start.",
    ],
    tip: "Keep your upper arms vertical and still — only the forearms move.",
  },
  "Close Grip Bench Press": {
    steps: [
      "Lie on a flat bench, grip the bar shoulder-width or slightly narrower.",
      "Lower the bar to your lower chest, keeping elbows close to your body.",
      "Press back up to full extension.",
    ],
  },
  "Overhead Tricep Extension": {
    steps: [
      "Stand or sit, hold a dumbbell or EZ-bar directly overhead.",
      "Bend at the elbows, lowering the weight behind your head.",
      "Stop when your forearms are roughly parallel to the floor.",
      "Extend back up to the start.",
    ],
  },
  "Tricep Dips": {
    steps: [
      "Grip parallel bars with straight arms, body upright.",
      "Lower yourself by bending at the elbows until your upper arms are parallel to the floor.",
      "Press back up to full extension.",
    ],
    tip: "Leaning slightly forward shifts emphasis to the chest; staying upright keeps it on the triceps.",
  },

  // ── Pull: Back ────────────────────────────────────────────────────────────

  "Deadlift": {
    steps: [
      "Stand with the bar over your mid-foot, feet hip-width.",
      "Hinge at the hips, grip the bar just outside your legs.",
      "Take a big breath, brace your core, then drive through the floor.",
      "Stand tall at the top — don't hyperextend. Hinge back down to reset.",
    ],
    tip: "Think 'push the floor away' rather than 'pull the bar up'.",
  },
  "Barbell Row": {
    steps: [
      "Hold the bar at hip height, hinge forward ~45° with a flat back.",
      "Pull the bar toward your lower chest/stomach, squeezing your shoulder blades.",
      "Lower under control — don't just drop it.",
    ],
    tip: "The bar should travel vertically — avoid swinging the torso.",
  },
  "Pull-Ups": {
    steps: [
      "Hang from a bar, overhand grip wider than shoulder-width.",
      "Retract your shoulder blades, then pull your chest toward the bar.",
      "Lower yourself all the way back to a full hang.",
    ],
    tip: "Start from a dead hang every rep — don't half-rep to make it easier.",
  },
  "Lat Pulldown": {
    steps: [
      "Sit at the machine, grip the bar wider than shoulder-width.",
      "Lean back slightly, then pull the bar to your upper chest.",
      "Control the bar back up until your arms are fully extended.",
    ],
  },
  "Seated Cable Row": {
    steps: [
      "Sit upright, feet on the platform, knees slightly bent.",
      "Grip the handle, keep your chest tall.",
      "Pull the handle toward your stomach, squeezing your shoulder blades together.",
      "Slowly return until arms are fully extended.",
    ],
  },
  "Single Arm Dumbbell Row": {
    steps: [
      "Place your off-side knee and hand on a flat bench for support.",
      "Hold the dumbbell in the working hand, arm hanging straight down.",
      "Row the dumbbell up toward your hip, keeping the elbow close.",
      "Lower slowly until the arm is fully extended.",
    ],
  },
  "T-Bar Row": {
    steps: [
      "Load one end of a barbell, straddle it and hinge forward ~45°.",
      "Grip the handles (or use a V-bar attachment) under the bar.",
      "Row the bar toward your chest, keeping your back flat.",
      "Lower under control.",
    ],
    tip: "If no T-bar machine is available, a landmine row achieves the same movement.",
  },
  "Face Pulls": {
    steps: [
      "Set the cable pulley at face height, attach a rope handle.",
      "Grip the rope with palms facing each other, step back.",
      "Pull the rope toward your face, flaring both elbows out wide.",
      "Pause at the ears, then return slowly.",
    ],
    tip: "Essential for shoulder health — most people skip this and regret it later.",
  },
  "Chest Supported Row": {
    steps: [
      "Set an incline bench to 45°, lie chest-down with dumbbells hanging.",
      "Row both dumbbells up by pulling your elbows back.",
      "Squeeze the shoulder blades at the top, then lower.",
    ],
    tip: "The chest support removes the ability to cheat with your lower back.",
  },

  // ── Pull: Biceps ──────────────────────────────────────────────────────────

  "Barbell Curl": {
    steps: [
      "Stand with a barbell at hip height, underhand grip shoulder-width.",
      "Pin your elbows to your sides and curl the bar to shoulder height.",
      "Squeeze the biceps at the top, then lower slowly.",
    ],
  },
  "Dumbbell Curl": {
    steps: [
      "Stand with dumbbells at your sides, palms facing forward.",
      "Curl both (or alternating) dumbbells up to shoulder height.",
      "Squeeze at the top, then slowly lower.",
    ],
  },
  "Hammer Curl": {
    steps: [
      "Stand with dumbbells at your sides, palms facing each other (neutral grip).",
      "Curl the dumbbells up without rotating your wrists.",
      "Lower slowly.",
    ],
    tip: "Hammer grip targets the brachialis — the muscle under the bicep that adds thickness.",
  },
  "Preacher Curl": {
    steps: [
      "Sit at the preacher bench, drape your upper arms over the angled pad.",
      "Grip the bar with an underhand grip.",
      "Curl from full extension up to the top, then lower slowly.",
    ],
    tip: "Full extension at the bottom is what makes preacher curls uniquely effective.",
  },
  "Incline Dumbbell Curl": {
    steps: [
      "Set a bench to 45–60° incline, sit back with arms hanging straight down.",
      "Curl both dumbbells simultaneously, keeping your upper arm vertical.",
      "Lower until your arms are fully extended.",
    ],
    tip: "The stretched starting position stretches the long head of the bicep for a deep contraction.",
  },
  "Cable Curl": {
    steps: [
      "Stand at the cable machine, low pulley with a bar or handle attachment.",
      "Grip underhand, pin elbows to your sides.",
      "Curl up to shoulder height, squeeze, then lower under control.",
    ],
  },

  // ── Legs: Quads / Hamstrings ──────────────────────────────────────────────

  "Barbell Squat": {
    steps: [
      "Rest the bar across your upper back (not your neck), feet shoulder-width.",
      "Brace your core, take a breath, then squat down — hips back and down.",
      "Lower until your thighs are at least parallel to the floor.",
      "Drive back up through your heels.",
    ],
    tip: "Keep your chest up and knees tracking over your toes throughout.",
  },
  "Romanian Deadlift": {
    steps: [
      "Stand holding the bar at hip height, feet hip-width.",
      "Hinge at the hips (minimal knee bend), pushing hips backward.",
      "Lower the bar along your legs, feeling the hamstring stretch.",
      "Drive hips forward to return to standing.",
    ],
    tip: "The bar should drag along your legs the entire way — this means you're doing it right.",
  },
  "Leg Press": {
    steps: [
      "Sit in the machine, place feet shoulder-width on the plate.",
      "Release the safety handles and lower the weight until knees are at 90°.",
      "Press back to near full extension — don't lock out.",
    ],
    tip: "Avoid letting your lower back round off the seat at the bottom.",
  },
  "Bulgarian Split Squat": {
    steps: [
      "Stand in front of a bench, place your rear foot on top of it.",
      "Step your front foot forward enough so your shin is vertical at the bottom.",
      "Lower your rear knee toward the floor.",
      "Drive through your front heel to stand back up.",
    ],
    tip: "This is one of the hardest leg exercises — start light and build up.",
  },
  "Hack Squat": {
    steps: [
      "Step into the hack squat machine, shoulder pads on your shoulders.",
      "Place feet low and shoulder-width on the platform.",
      "Lower until thighs are parallel, then press back up.",
    ],
  },
  "Leg Curl": {
    steps: [
      "Lie face-down on the machine, hook your heels under the pad.",
      "Curl your legs up toward your glutes.",
      "Pause briefly, then lower slowly back to the start.",
    ],
  },
  "Leg Extension": {
    steps: [
      "Sit upright in the machine, hook your feet under the pad.",
      "Extend your legs straight up until nearly locked out.",
      "Lower slowly — don't let the weight stack drop.",
    ],
    tip: "A great isolation move but shouldn't be your only quad exercise.",
  },
  "Walking Lunges": {
    steps: [
      "Stand tall, step forward into a lunge — front shin vertical, back knee toward the floor.",
      "Drive off your front foot to step forward into the next lunge.",
      "Alternate legs across the floor.",
    ],
  },
  "Calf Raises": {
    steps: [
      "Stand with the balls of your feet on the edge of a step, heels hanging off.",
      "Rise up onto your toes as high as possible.",
      "Lower slowly below the step level for a full stretch.",
    ],
    tip: "Slow controlled reps beat heavy partial reps every time for calves.",
  },
  "Goblet Squat": {
    steps: [
      "Hold a dumbbell vertically at chest height with both hands.",
      "Feet shoulder-width, toes slightly flared.",
      "Squat down, keeping your elbows inside your knees at the bottom.",
      "Drive back up through your heels.",
    ],
    tip: "A great teaching tool for learning squat mechanics — the weight naturally keeps you upright.",
  },

  // ── Legs: Glutes ──────────────────────────────────────────────────────────

  "Hip Thrust": {
    steps: [
      "Sit on the floor with your upper back against a bench, bar across your hips.",
      "Feet flat on the floor, hip-width apart.",
      "Drive your hips up until your body forms a straight line from knees to shoulders.",
      "Squeeze your glutes hard at the top, then lower.",
    ],
    tip: "Use a bar pad for comfort — the glute squeeze at the top is everything.",
  },
  "Sumo Deadlift": {
    steps: [
      "Stand with feet wider than shoulder-width, toes pointed well outward.",
      "Grip the bar inside your legs, keeping your chest up.",
      "Drive through the floor, keeping the bar close and torso more upright than a conventional deadlift.",
    ],
  },
  "Cable Kickback": {
    steps: [
      "Attach an ankle cuff to the low pulley cable.",
      "Face the machine, brace yourself on the frame.",
      "Kick your working leg back and up, squeezing the glute at the top.",
      "Slowly lower back down.",
    ],
  },
  "Glute Bridge": {
    steps: [
      "Lie on your back, knees bent, feet flat on the floor hip-width apart.",
      "Drive your hips straight up by squeezing your glutes.",
      "Hold at the top for 1–2 seconds.",
      "Lower slowly and repeat.",
    ],
    tip: "A lighter, more joint-friendly alternative to the hip thrust — perfect as a warm-up.",
  },
};
